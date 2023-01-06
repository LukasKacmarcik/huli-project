import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Extra, updateSelectedExtras } from "../../../../app/slices/orders";

const Extras: React.FC = () => {
  const dispatch = useAppDispatch();
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

  const initialExtrasState: { [key: string]: boolean } = {};

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
        [name]: e.target.checked,
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

  const listOfAllOfferedExtras = (
    <form>
      {allOfferedExtras.map((extra, index) => {
        return (
          <div key={index}>
            <label htmlFor={extra.name}>
              {extra.name} {extra.price}
            </label>
            <input
              type="checkbox"
              id={extra.name}
              name={extra.name}
              value={extra.name}
              data-price={extra.price}
              onChange={handleChange}
            />
          </div>
        );
      })}
    </form>
  );

  return <>{listOfAllOfferedExtras}</>;
};

export default Extras;
