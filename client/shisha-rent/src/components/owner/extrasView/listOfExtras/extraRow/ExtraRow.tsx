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
      <td>{extra.name}</td>
      <td>{extra.price}</td>
      <td>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default ExtraRow;
