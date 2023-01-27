import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Extra, updateSelectedExtras } from "../../../../app/slices/orders";
import styles from "./Extras.module.scss";

const Extras: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedExtras, offeredExtras } = useAppSelector(
    (state) => state.orders
  );
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  const selectedShishaExtras = useAppSelector(
    (state) => state.shishas.selectedShisha?.shishaExtras
  );

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
  //// On selecting of shisha or selecting another one this will reset all alredy selected extras (global state)
  //// and create new local extras state that control checkboxes.
  useEffect(() => {
    const refreshedExtra = allOfferedExtras.reduce((acc: any, extra) => {
      acc[extra.name] = false;
      return acc;
    }, {});

    setExtras(refreshedExtra);
    dispatch(updateSelectedExtras([]));
  }, [dispatch, selectedShisha, allOfferedExtras]);

  const listOfAllOfferedExtras = offeredExtras ? (
    <form className={styles.extrasForm}>
      {allOfferedExtras.map((extra, index) => {
        return (
          <div
            key={extra.name}
            className={
              selectedExtras?.find((oneExtra) => oneExtra.name === extra.name)
                ? styles.selected
                : ""
            }
          >
            <label htmlFor={extra.name}>{extra.name}</label>
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
      <h2>Doplnky</h2>
      {/* Condition below make sure that we create key/value pair for each extra that we want to render
       and after that it can render list of inputs */}
      {Object.keys(extras).length ===
        offeredExtras.length +
          (selectedShishaExtras ? selectedShishaExtras?.length : 0) &&
        listOfAllOfferedExtras}
    </div>
  );
};

export default Extras;
