import React from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { deleteCity, City } from "../../../../../app/slices/orders";

interface ExtraProps {
  city: City;
}

const CityRow: React.FC<ExtraProps> = ({ city }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (city._id) dispatch(deleteCity(city._id));
  };

  return (
    <tr data-order_id={city._id}>
      <th>{city.name}</th>
      <th>{city.price}</th>
      <th style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <button onClick={handleDelete}>Delete</button>
      </th>
    </tr>
  );
};

export default CityRow;
