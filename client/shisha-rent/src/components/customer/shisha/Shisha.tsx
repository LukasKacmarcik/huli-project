import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  setSelectedShisha,
  Shisha as ShishaType,
} from "../../../app/slices/shishas";
import styles from "./Shisha.module.scss";
var Scroll = require("react-scroll");
var scroller = Scroll.scroller;

interface Props {
  passedShisha: ShishaType;
}

const Shisha: React.FC<Props> = ({ passedShisha }) => {
  const dispatch = useAppDispatch();

  ////This is async function bc selectedShishaElement returns null for the first time when clicked if not async
  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    await dispatch(setSelectedShisha(passedShisha._id));
    scroller.scrollTo("selectedShishaElement", {
      duration: 500,
      smooth: true,
      offset: -100,
    });
  };

  return (
    <div
      className={styles.shisha}
      // onClick={handleClick}
      data-shishaid={passedShisha._id}
    >
      <div className={styles.imgWrapper}>
        <img src={passedShisha.selectedFile} alt="shisha" loading="lazy"/>
      </div>
      <h2>{passedShisha.name}</h2>
      <h4>{passedShisha.price} €</h4>
    </div>
  );
};

export default Shisha;
