import React from "react";
import { Shisha as ShishaType } from "../../../app/slices/shishas";
import styles from "./ShishasDatePicker.module.scss";

interface Props {
  passedShisha: ShishaType;
}

const ShishasDatePicker: React.FC<Props> = ({ passedShisha }) => {
  console.log(passedShisha);

  return (
    <div className={styles.ShishasDatePicker}>
      <h1>ShishasDatePicker</h1>
    </div>
  );
};

export default ShishasDatePicker;
