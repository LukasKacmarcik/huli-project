import React from "react";
import { Shisha as ShishaType } from "../../app/slices/shishas";
import styles from "./Shisha.module.scss";

interface Props {
  passedShisha: ShishaType;
}

const Shisha: React.FC<Props> = ({ passedShisha }) => {
  console.log(passedShisha);

  return (
    <div className={styles.shisha}>
      <div className={styles.imgWrapper}>
        <img src={passedShisha.selectedFile} alt="shisha" />
      </div>
      <h2>{passedShisha.name}</h2>
      <p>{passedShisha.description}</p>
      <h4>{passedShisha.price}</h4>
    </div>
  );
};

export default Shisha;
