import React from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { deleteTobacco, Tobacco } from "../../../../../app/slices/orders";

interface TobaccoProps {
  tobacco: Tobacco;
}

const TobaccoRow: React.FC<TobaccoProps> = ({ tobacco }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (tobacco._id) dispatch(deleteTobacco(tobacco._id));
  };

  return (
    <tr data-order_id={tobacco._id}>
      <th>{tobacco.name}</th>
      <th>{tobacco.type}</th>
      <th>{tobacco.price}</th>
      <th style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <button onClick={handleDelete}>Delete</button>
      </th>
    </tr>
  );
};

export default TobaccoRow;
