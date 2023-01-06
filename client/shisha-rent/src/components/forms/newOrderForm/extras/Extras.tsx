import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Extra, updateSelectedExtras } from "../../../../app/slices/orders";
import styles from "./Extras.module.scss";

const Extras: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedExtras = useAppSelector((state) => state.orders.selectedExtras);
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  const selectedShishaExtras = useAppSelector(
    (state) => state.shishas.selectedShisha?.shishaExtras
  );

  const offeredExtras = useAppSelector((state) => state.orders.offeredExtras);

  //// Add selectedShishaExtras and shared extras to one array, base on this render checkboxes.
  const allOfferedExtras: Extra[] = useMemo(() => {
    return selectedShishaExtras
      ? [...selectedShishaExtras, ...offeredExtras]
      : offeredExtras;
  }, [offeredExtras, selectedShishaExtras]);

  const initialExtrasState: { [key: string]: boolean } =
    allOfferedExtras.reduce((acc: any, extra) => {
      acc[extra.name] = false;
      return acc;
    }, {});

  //// This can be removed if everything works fine.
  // if (selectedShishaExtras) {
  //   console.log(selectedShishaExtras);
  //   [...offeredExtras, ...selectedShishaExtras].forEach((extra) => {
  //     initialExtrasState[extra.name] = false;
  //   });
  // } else {
  //   offeredExtras.forEach((extra) => {
  //     initialExtrasState[extra.name] = false;
  //   });
  // }

  const [extras, setExtras] = useState(initialExtrasState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setExtras((ps) => {
      return {
        ...ps,
        [name]: !ps[name],
      };
    });
  };

  useEffect(() => {
    //// Filters only selected extras and returns array of their names
    const currentlySelectedExtras = Object.entries(extras)
      .filter(([name, selected]) => selected === true)
      .map((keyValArr) => keyValArr[0]);
    //// Takes array with filtered names and gets all extras that match name from array
    const filteredSelectedExtras: Extra[] = allOfferedExtras.filter((extra) =>
      currentlySelectedExtras.includes(extra.name)
    );
    dispatch(updateSelectedExtras(filteredSelectedExtras));
  }, [extras, dispatch, allOfferedExtras]);

  useEffect(() => {
    const refreshedExtra = allOfferedExtras.reduce((acc: any, extra) => {
      acc[extra.name] = false;
      return acc;
    }, {});
    console.log("refreshedExtra: ", refreshedExtra);

    setExtras(refreshedExtra);
    dispatch(updateSelectedExtras([]));
  }, [dispatch, selectedShisha, allOfferedExtras]);
  console.log("extras:", extras);
  console.log("allOfferedExtras:", allOfferedExtras);

  const listOfAllOfferedExtras = offeredExtras ? (
    <form className={styles.extrasForm}>
      {allOfferedExtras.map((extra, index) => {
        return (
          <div
            key={index}
            className={
              selectedExtras?.find((oneExtra) => oneExtra.name === extra.name)
                ? styles.selected
                : ""
            }
          >
            <label htmlFor={extra.name}>
              {extra.name} {extra.price}
            </label>
            <input
              type="checkbox"
              id={extra.name}
              name={extra.name}
              checked={extras[extra.name]}
              data-price={extra.price}
              onChange={handleChange}
            />
          </div>
        );
      })}
    </form>
  ) : null;

  return (
    <div className={styles.listOfAllOfferedExtras}>
      <h2>Extra </h2>
      <p>(€)</p>
      {listOfAllOfferedExtras}
    </div>
  );
};

export default Extras;
