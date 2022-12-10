import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Extra, updateSelectedExtras } from "../../../../app/slices/orders";

const Extras: React.FC = () => {
  const dispatch = useAppDispatch();

  const offeredExtras: Extra[] = useAppSelector(
    (state) => state.orders.offeredExtras
  );
  // const offeredExtras: Extra[] = [
  //   { name: "uhliky", price: 5 },
  //   { name: "alobal", price: 3 },
  // ];

  const initialExtrasState: { [key: string]: boolean } = {};
  offeredExtras.forEach((extra) => {
    initialExtrasState[extra.name] = false;
  });

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
    const currentlySelectedExtras = Object.entries(extras)
      .filter(([name, selected]) => selected === true)
      .map((keyValArr) => keyValArr[0]);
    const filteredSelectedExtras: Extra[] = offeredExtras.filter((extra) =>
      currentlySelectedExtras.includes(extra.name)
    );
    dispatch(updateSelectedExtras(filteredSelectedExtras));
  }, [extras, dispatch, offeredExtras]);

  const listOfOfferedExtras = (
    <form>
      {offeredExtras.map((extra, index) => {
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

  return <>{listOfOfferedExtras}</>;
};

export default Extras;
