import React from "react";
import { useAppSelector } from "../../../../../app/hooks";
import styles from "./SelectedShishaPreview.module.scss";

const SelectedShishaPreview: React.FC = () => {
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  return (
    <div className={styles.selectedShishaPreview}>
      <div className={styles.imgWrapper}>
        <img src={selectedShisha?.selectedFile} alt="selected shisha" loading="lazy"/>
      </div>
      <div className={styles.shishaDetails}>
        {selectedShisha?.name && <h1>{selectedShisha?.name}</h1>}
        {selectedShisha?.description && <p>{selectedShisha?.description}</p>}
        {selectedShisha?.price && <h2>{selectedShisha?.price} €</h2>}
      </div>
    </div>
  );
};

export default SelectedShishaPreview;
