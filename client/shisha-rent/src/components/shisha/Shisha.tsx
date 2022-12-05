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
  console.log(passedShisha);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("clickEvent: ", e.currentTarget);
    console.log("clickEvent dataset: ", e.currentTarget.dataset.shishaid);
    dispatch(setSelectedShisha(passedShisha._id));
  };

  return (
    <div
      className={styles.shisha}
      onClick={handleClick}
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
