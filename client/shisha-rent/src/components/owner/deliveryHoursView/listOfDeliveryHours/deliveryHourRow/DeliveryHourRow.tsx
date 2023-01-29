import React from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import {
  deleteDeliveryHour,
  DeliveryHour,
} from "../../../../../app/slices/orders";

interface DeliveryHourProps {
  deliveryHour: DeliveryHour;
}

const DeliveryHourRow: React.FC<DeliveryHourProps> = ({ deliveryHour }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (deliveryHour._id) dispatch(deleteDeliveryHour(deliveryHour._id));
  };

  return (
    <tr data-order_id={deliveryHour._id}>
      <td>{deliveryHour.hour}</td>
      <td>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default DeliveryHourRow;
