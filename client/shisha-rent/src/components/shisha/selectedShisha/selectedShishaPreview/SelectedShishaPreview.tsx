import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import styles from "./SelectedShishaPreview.module.scss";

const SelectedShishaPreview: React.FC = () => {
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  return (
    <div className={styles.selectedShishaPreview}>
      <div className={styles.imgWrapper}>
        <img src={selectedShisha?.selectedFile} alt="selected shisha" />
      </div>
      <div className={styles.shishaDetails}>
        {selectedShisha?.name && <h1>Name: {selectedShisha?.name}</h1>}
        {selectedShisha?.description && (
          <h3>Description: {selectedShisha?.description}</h3>
        )}
        {selectedShisha?.price && <h2>Price: {selectedShisha?.price}</h2>}
      </div>
    </div>
  );
};

export default SelectedShishaPreview;
