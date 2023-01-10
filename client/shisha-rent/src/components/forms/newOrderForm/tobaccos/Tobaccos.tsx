import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchTobaccos,
  updateTobaccoPrice,
} from "../../../../app/slices/orders";
import styles from "./Tobaccos.module.scss";

const Tobaccos: React.FC = () => {
  const dispatch = useAppDispatch();

  const { offeredTobaccos } = useAppSelector((state) => state.orders);
  const tobacoPrice =
    offeredTobaccos.length !== 0
      ? offeredTobaccos[offeredTobaccos.length - 1].price
      : 0;

  const classicTobaccos = offeredTobaccos.filter(
    (tobacco) => tobacco.type === "tobacco"
  );

  const molasses = offeredTobaccos.filter(
    (tobacco) => tobacco.type === "molasses"
  );

  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  const defaultTobacco = "defaultTobacco";
  const [selectedTobacco, setSelectedTobacco] = useState(defaultTobacco);

  const isTabaccoSelected = (value: string): boolean =>
    value === selectedTobacco;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedTobacco(e.currentTarget.value);
  };

  const listOfClassicTobaccos = classicTobaccos ? (
    <div className={styles.classicTobaccos}>
      {[...classicTobaccos]
        .sort((a, b) => a.name.length - b.name.length)
        .map((tobacco) => {
          return (
            <div
              key={tobacco._id}
              className={tobacco._id === selectedTobacco ? styles.selected : ""}
            >
              <label htmlFor={tobacco._id}>{tobacco.name}</label>
              <input
                type="radio"
                id={tobacco._id}
                name="tabacco"
                value={tobacco._id}
                checked={isTabaccoSelected(
                  tobacco._id ? tobacco._id : "tobaccoId is undefined"
                )}
                onChange={handleChange}
              />
            </div>
          );
        })}
    </div>
  ) : null;

  const listOfMolasses = molasses ? (
    <div className={styles.molasses}>
      {[...molasses]
        .sort((a, b) => b.name.length - a.name.length)
        .map((tobacco) => {
          return (
            <div
              key={tobacco._id}
              className={tobacco._id === selectedTobacco ? styles.selected : ""}
            >
              <label htmlFor={tobacco._id}>{tobacco.name}</label>
              <input
                type="radio"
                id={tobacco._id}
                name="tabacco"
                value={tobacco._id}
                checked={isTabaccoSelected(
                  tobacco._id ? tobacco._id : "tobaccoId is undefined"
                )}
                onChange={handleChange}
              />
            </div>
          );
        })}
    </div>
  ) : null;

  useEffect(() => {
    dispatch(fetchTobaccos());
  }, [dispatch]);

  useEffect(() => {
    setSelectedTobacco(defaultTobacco);
  }, [selectedShisha]);

  useEffect(() => {
    if (selectedTobacco !== defaultTobacco)
      dispatch(updateTobaccoPrice(tobacoPrice));
  }, [dispatch, tobacoPrice, selectedTobacco]);

  return offeredTobaccos.length !== 0 ? (
    <div className={styles.listOfAllOfferedTobaccos}>
      <h2>Tabaky {tobacoPrice} (€)</h2>
      <form className={styles.tobaccosForm}>
        <div className={styles.classicTobaccosDiv}>
          <h2>Klasika</h2>
          {listOfClassicTobaccos}
        </div>
        <div className={styles.molassesDiv}>
          <h2>Melasy</h2>
          {listOfMolasses}
        </div>
      </form>
    </div>
  ) : null;
};

export default Tobaccos;
