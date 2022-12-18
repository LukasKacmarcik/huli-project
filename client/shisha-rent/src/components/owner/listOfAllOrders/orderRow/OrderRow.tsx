import React from "react";
import { useAppDispatch } from "../../../../app/hooks";
import {
  fetchOrders,
  Order,
  switchOrderDoneStatus,
} from "../../../../app/slices/orders";

interface OrderProps {
  order: Order;
}

export interface OrderSwitchDoneBody {
  _id: string;
  done: boolean;
}

const OrderRow: React.FC<OrderProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  const extrasInString = order.extras
    ?.reduce((str, extra, idx) => {
      return (str += ` ${
        idx + 1 === order.extras?.length ? extra.name : extra.name + ","
      }`);
    }, "")
    .trim();

  const switchDoneState = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (order._id !== undefined && order.done !== undefined) {
      const switchBody: OrderSwitchDoneBody = {
        _id: order._id,
        done: order.done,
      };
      await dispatch(switchOrderDoneStatus(switchBody));
      await dispatch(fetchOrders());
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
      <th>{order.done ? "Yes" : "No"}</th>
      <th style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <button onClick={switchDoneState}>Switch done status</button>
        <button>Update</button>
      </th>
    </tr>
  );
};

export default OrderRow;
