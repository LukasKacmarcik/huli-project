import React, { useEffect } from "react";
import styles from "./ShishasDatePicker.module.scss";
import { useState } from "react";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  DeliveryHours,
  updateNewOrderDate,
} from "../../../../app/slices/orders";
import { fetchExcludedDates } from "../../../../app/slices/shishas";

const ShishasDatePicker: React.FC = () => {
  const validHourOptions = useAppSelector(
    (state) => state.orders.deliveryHours
  );
  // const validHourOptions = [7, 8, 9, 10, 11];
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const selectedShishaName = useAppSelector(
    (state) => state.shishas.selectedShisha?.name
  );
  const myTime = new Date("2022-12-26T16:00:48.212Z");
  const myDatesArr: Date[] = [myTime, subDays(myTime, -1)];

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
      onChange={handleSetHours}
      disabled={startDate !== null ? false : true}
    >
      <option value={undefined}>Zvoľ čas donášky</option>
      {validHourOptions.map((option: DeliveryHours) => {
        return (
          <option key={option.hour} value={option.hour}>
            {option.hour}
          </option>
        );
      })}
    </select>
  );
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
      <h1>ShishasDatePicker</h1>
      <div className={styles.datePickerWeapper}>
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date: Date) => setStartDate(date)}
          minDate={subDays(new Date(), -1)}
          excludeDates={myDatesArr}
          placeholderText="Zvol si svoj den"
        />
      </div>
      {hourOptions}
    </div>
  );
};

export default ShishasDatePicker;
