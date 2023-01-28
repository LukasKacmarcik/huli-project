import React, { useEffect } from "react";
import styles from "./ShishasDatePicker.module.scss";
import { useState } from "react";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  DeliveryHour,
  updateNewOrderDate,
} from "../../../../../app/slices/orders";
import { fetchExcludedDates } from "../../../../../app/slices/shishas";
import { getReservedDates } from "../../../../../functions";

interface ExcludedDateObject {
  _id: string;
  dateOfDelivery: string;
}

const ShishasDatePicker: React.FC = () => {
  const validHourOptions = useAppSelector(
    (state) => state.orders.deliveryHours
  );
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const selectedShishaName = useAppSelector(
    (state) => state.shishas.selectedShisha?.name
  );

  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );
  const selectedShishaAmount = useAppSelector(
    (state) => state.shishas.selectedShisha?.amount
  );

  const messages = useAppSelector((state) => state.orders.messages);

  //// Array of all dates when selected shisha is already ordered plus day before and day after an order
  const myDatesArr: Date[] = useAppSelector(
    (state) => state.shishas.excludedDates
  )?.reduce((acc: Date[], excludedDateObj: ExcludedDateObject) => {
    //// Push date of delivery
    acc.push(new Date(excludedDateObj.dateOfDelivery));
    //// Push day after date of delivery
    acc.push(subDays(new Date(excludedDateObj.dateOfDelivery), -1));
    //// Push day before date of delivery
    acc.push(subDays(new Date(excludedDateObj.dateOfDelivery), 1));
    return acc;
  }, []);

  //// Returns only dates at witch it is not possible to order selected shisha due to matched or exeeded limit of orders of that shisha for particular date. In other words there is not another shisha of this type in warehouse to be ordered.
  const reservedDates =
    myDatesArr && selectedShishaAmount
      ? getReservedDates(myDatesArr, selectedShishaAmount)
      : [];

  const handleSetHours = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartDate((ps) => {
      if (ps instanceof Date) {
        const isoDate = ps.toISOString();
        const updatedDate: Date = new Date(isoDate);
        updatedDate.setHours(parseInt(e.target.value));
        return updatedDate;
      } else {
        console.log("startDate is null and we cant set hours to that");
        return ps;
      }
    });
  };

  const hourOptions = (
    <select
      className={messages.ordeHourError ? styles.inputError : ""}
      onChange={handleSetHours}
      defaultValue="default"
      disabled={startDate !== null ? false : true}
    >
      <option id="defaultOption" value="default" disabled>
        Zvol čas donášky
      </option>
      {validHourOptions.map((option: DeliveryHour) => {
        return (
          <option key={option.hour} value={option.hour}>
            {option.hour}
          </option>
        );
      })}
    </select>
  );

  //// When selectedShisha is switched this will reset startDate to null and select tag for selecting hours to default.
  useEffect(() => {
    setStartDate(null);
    dispatch(updateNewOrderDate(null));
    const defaultOption: HTMLOptionElement | null =
      document.querySelector("#defaultOption");
    if (defaultOption) defaultOption.selected = true;
  }, [selectedShisha, dispatch]);

  useEffect(() => {
    dispatch(fetchExcludedDates(selectedShishaName));
  }, [dispatch, selectedShishaName]);

  useEffect(() => {
    if (startDate) {
      dispatch(updateNewOrderDate(startDate.toISOString()));
    }
  }, [startDate, dispatch]);

  return (
    <div className={styles.shishasDatePicker}>
      <h2>Dátum a Čas</h2>
      <div className={styles.datePickerWeapper}>
        <DatePicker
          className={messages.orderDateError ? styles.inputError : ""}
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date: Date) => setStartDate(date)}
          minDate={subDays(new Date(), -1)}
          excludeDates={reservedDates}
          placeholderText="Zvol si svoj deň"
        />
      </div>
      {hourOptions}
      {messages.orderDateError && (
        <p className={styles.error}>{messages.orderDateError}</p>
      )}
      {messages.ordeHourError && (
        <p className={styles.error}>{messages.ordeHourError}</p>
      )}
    </div>
  );
};

export default ShishasDatePicker;
