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
      <td>{tobacco.name}</td>
      <td>{tobacco.type}</td>
      <td>{tobacco.price}</td>
      <td>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default TobaccoRow;
