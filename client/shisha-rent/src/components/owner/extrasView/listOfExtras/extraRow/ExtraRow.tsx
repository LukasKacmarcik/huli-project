import React from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { deleteExtra, Extra } from "../../../../../app/slices/orders";

interface ExtraProps {
  extra: Extra;
}

const ExtraRow: React.FC<ExtraProps> = ({ extra }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (extra._id) dispatch(deleteExtra(extra._id));
  };

  return (
    <tr data-order_id={extra._id}>
      <th>{extra.name}</th>
      <th>{extra.price}</th>
      <th style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <button onClick={handleDelete}>Delete</button>
      </th>
    </tr>
  );
};

export default ExtraRow;
