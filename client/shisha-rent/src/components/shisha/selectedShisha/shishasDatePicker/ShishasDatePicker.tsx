import React, { useEffect } from "react";
import styles from "./ShishasDatePicker.module.scss";
import { useState } from "react";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";
import { useAppDispatch } from "../../../../app/hooks";
import { updateNewOrderDate } from "../../../../app/slices/orders";

const ShishasDatePicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const myTime = new Date("2022-12-26T16:00:48.212Z");
  const myDatesArr: Date[] = [myTime, subDays(myTime, -1)];

  useEffect(() => {
    if (startDate) {
      dispatch(updateNewOrderDate(startDate.toISOString()));
    }
  }, [startDate]);

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
    </div>
  );
};

export default ShishasDatePicker;
