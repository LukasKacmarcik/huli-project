import React from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  setSelectedShisha,
  Shisha as ShishaType,
} from "../../app/slices/shishas";
import styles from "./Shisha.module.scss";

interface Props {
  passedShisha: ShishaType;
}

const Shisha: React.FC<Props> = ({ passedShisha }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.shisha}
      onClick={() => dispatch(setSelectedShisha(passedShisha._id))}
      data-shishaid={passedShisha._id}
    >
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
