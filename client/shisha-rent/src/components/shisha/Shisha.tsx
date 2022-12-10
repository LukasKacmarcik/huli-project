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

  ////This is async function bc selectedShishaElement returns null for the first time when clicked if not async
  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    await dispatch(setSelectedShisha(passedShisha._id));
    const selectedShishaElement = document.getElementById("selectedShisha");
    //// behaviour smoth is buggy
    selectedShishaElement?.scrollIntoView({
      behavior: "auto",
    });
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
