import React, { useEffect } from "react";
import SelectedShishaPreview from "./selectedShishaPreview/SelectedShishaPreview";
import ShishasDatePicker from "./shishasDatePicker/ShishasDatePicker";
import styles from "./SelectedShisha.module.scss";

const SelectedShisha: React.FC = () => {
  return (
    <div id="selectedShisha" className={styles.selectedShisha}>
      <SelectedShishaPreview />
      <ShishasDatePicker />
    </div>
  );
};

export default SelectedShisha;
