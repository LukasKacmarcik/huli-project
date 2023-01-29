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
      <td>{city.name}</td>
      <td>{city.price}</td>
      <td>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default CityRow;
