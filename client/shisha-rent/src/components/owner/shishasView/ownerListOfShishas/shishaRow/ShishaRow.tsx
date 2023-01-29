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
      <td>{shisha.name}</td>
      <td>{shisha.description}</td>
      <td>{shisha.price}</td>
      <td>{shisha.deposit}</td>
      <td>{shisha.show ? "Yes" : "No"}</td>
      {/* <td>{shisha.selectedFile}</td> */}
      <td>{shisha.amount}</td>
      <td>
        <div>
          <button style={{ backgroundColor: "orange" }} onClick={redirect}>
            Update
          </button>
          <button style={{ backgroundColor: "red" }} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ShishaRow;
