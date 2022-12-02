import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ShishaComponent from "../shisha/Shisha";
import { fetchShishas, Shisha } from "../../app/slices/shishas";
import styles from "./ListOfShishas.module.scss";

const ListOfShishas: React.FC = () => {
  const shishas: Shisha[] = useAppSelector((state) => state.shishas.shishas);
  const listOfShishas = shishas.map((shisha) => {
    return (
      <li key={shisha.name}>
        <ShishaComponent passedShisha={shisha} />;
      </li>
    );
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchShishas());
    console.log("ListOfShishas useEffect run");
  }, [dispatch]);

  return <ul className={styles.listOfShisha}>{listOfShishas}</ul>;
};

export default ListOfShishas;
