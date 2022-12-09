import React, { useEffect } from "react";
import SelectedShishaPreview from "./selectedShishaPreview/SelectedShishaPreview";
import ShishasDatePicker from "./shishasDatePicker/ShishasDatePicker";
import styles from "./SelectedShisha.module.scss";
import { useAppSelector } from "../../../app/hooks";

const SelectedShisha: React.FC = () => {
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  useEffect(() => {
    const selectedShishaElement = document.getElementById("selectedShisha");
    selectedShishaElement?.scrollIntoView({ behavior: "smooth" });
  }, [selectedShisha]);

  return (
    <div id="selectedShisha" className={styles.selectedShisha}>
      <SelectedShishaPreview />
      <ShishasDatePicker />
    </div>
  );
};

export default SelectedShisha;
