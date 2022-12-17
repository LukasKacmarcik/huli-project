import React from "react";
import { Order } from "../../../../app/slices/orders";

interface OrderProps {
  order: Order;
}

const OpenOrderRow: React.FC<OrderProps> = ({ order }) => {
  const extrasInString = order.extras
    ?.reduce((str, extra, idx) => {
      return (str += ` ${
        idx + 1 === order.extras?.length ? extra.name : extra.name + ","
      }`);
    }, "")
    .trim();

  return (
    <tr data-order_id={order._id}>
      <th>{order.userFullName}</th>
      <th>{order.userAddress}</th>
      <th>{order.userTelNumber}</th>
      <th>{order.shishaName}</th>
      <th>{extrasInString}</th>
      <th>{order.total}</th>
      <th>{order.userNote}</th>
      <th>{order.ownerNote}</th>
      <th>{new Date(order.dateOfDelivery).toLocaleDateString()}</th>
      <th>{new Date(order.dateOfDelivery).getHours()}</th>
      <th>{order.done}</th>
    </tr>
  );
};

export default OpenOrderRow;
