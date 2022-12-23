import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../app/hooks";
import { deleteShisha, Shisha } from "../../../../../app/slices/shishas";

interface ShishaProps {
  shisha: Shisha;
}

const ShishaRow: React.FC<ShishaProps> = ({ shisha }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (shisha._id) dispatch(deleteShisha(shisha._id));
  };

  const redirect = () => {
    navigate(`/owner/shisha/update/${shisha._id}`);
  };

  return (
    <tr data-order_id={shisha._id}>
      <th>{shisha.name}</th>
      <th>{shisha.description}</th>
      <th>{shisha.price}</th>
      <th>{shisha.show ? "Yes" : "No"}</th>
      {/* <th>{shisha.selectedFile}</th> */}
      <th>Image here</th>
      <th style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <button onClick={redirect}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </th>
    </tr>
  );
};

export default ShishaRow;
