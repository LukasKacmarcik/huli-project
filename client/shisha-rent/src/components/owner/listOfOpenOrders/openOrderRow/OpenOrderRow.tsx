import React from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { Order, switchOrderDoneStatus } from "../../../../app/slices/orders";

interface OrderProps {
  order: Order;
}

export interface OrderSwitchDoneBody {
  _id: string;
  done: boolean;
}

const OpenOrderRow: React.FC<OrderProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  const extrasInString = order.extras
    ?.reduce((str, extra, idx) => {
      return (str += ` ${
        idx + 1 === order.extras?.length ? extra.name : extra.name + ","
      }`);
    }, "")
    .trim();

  const markAsDone = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (order._id !== undefined && order.done !== undefined) {
      const switchBody: OrderSwitchDoneBody = {
        _id: order._id,
        done: order.done,
      };
      dispatch(switchOrderDoneStatus(switchBody));
    }
  };

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
      <th style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <button onClick={markAsDone}>Done</button>
        <button>Update</button>
      </th>
    </tr>
  );
};

export default OpenOrderRow;
