import React from "react";
import styles from "./ShishasDatePicker.module.scss";
import { useState } from "react";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";

const ShishasDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const myTime = new Date("2022-12-26T16:00:48.212Z");
  const myDatesArr: Date[] = [myTime, subDays(myTime, -1)];

  return (
    <div className={styles.shishasDatePicker}>
      <h1>ShishasDatePicker</h1>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        minDate={subDays(new Date(), -1)}
        excludeDates={myDatesArr}
        placeholderText="Select a date other than today or yesterday"
      />
    </div>
  );
};

export default ShishasDatePicker;
