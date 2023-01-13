import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchTobaccos,
  updateSelectedTobacco,
  updateTobaccoPrice,
} from "../../../../app/slices/orders";
import styles from "./Tobaccos.module.scss";

const Tobaccos: React.FC = () => {
  const dispatch = useAppDispatch();

  const { offeredTobaccos } = useAppSelector((state) => state.orders);
  const tobacoPrice =
    offeredTobaccos.length !== 0
      ? [...offeredTobaccos].sort((a, b) => b.price - a.price)[0].price
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

  const messages = useAppSelector((state) => state.orders.messages);

  const defaultTobaccoId = "defaultTobaccoId";
  const [selectedTobaccoId, setSelectedTobaccoId] = useState(defaultTobaccoId);
  const selectedTobacco = offeredTobaccos.find(
    (tobacco) => tobacco._id === selectedTobaccoId
  );
  const isTobaccoSelected = (value: string): boolean =>
    value === selectedTobaccoId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedTobaccoId(e.currentTarget.value);
  };

  const listOfClassicTobaccos = classicTobaccos ? (
    <div className={styles.classicTobaccos}>
      {[...classicTobaccos]
        .sort((a, b) => a.name.length - b.name.length)
        .map((tobacco) => {
          return (
            <div
              key={tobacco._id}
              className={
                tobacco._id === selectedTobaccoId ? styles.selected : ""
              }
            >
              <label htmlFor={tobacco._id}>{tobacco.name}</label>
              <input
                type="radio"
                id={tobacco._id}
                name="tabacco"
                value={tobacco._id}
                checked={isTobaccoSelected(
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
              className={
                tobacco._id === selectedTobaccoId ? styles.selected : ""
              }
            >
              <label htmlFor={tobacco._id}>{tobacco.name}</label>
              <input
                type="radio"
                id={tobacco._id}
                name="tabacco"
                value={tobacco._id}
                checked={isTobaccoSelected(
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
    setSelectedTobaccoId(defaultTobaccoId);
    dispatch(updateSelectedTobacco(null));
    dispatch(updateTobaccoPrice(0));
  }, [selectedShisha, dispatch]);

  useEffect(() => {
    if (selectedTobacco) dispatch(updateSelectedTobacco(selectedTobacco));
  }, [dispatch, selectedTobacco]);

  useEffect(() => {
    if (selectedTobaccoId !== defaultTobaccoId)
      dispatch(updateTobaccoPrice(tobacoPrice));
  }, [dispatch, tobacoPrice, selectedTobaccoId]);

  return offeredTobaccos.length !== 0 ? (
    <div
      className={`${styles.listOfAllOfferedTobaccos} ${
        messages.ordeTobaccoError ? styles.inputError : ""
      }`}
    >
      <h2 className={styles.tobaccoTitle}>
        Tabaky {tobacoPrice} <p>€</p>
      </h2>
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
      <p className={styles.error}>{messages.ordeTobaccoError}</p>
    </div>
  ) : null;
};

export default Tobaccos;
