import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
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
}

const OpenOrderRow: React.FC<OrderProps> = ({ order }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showAllOrders = useAppSelector((state) => state.orders.showAllOrders);
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
      };
      await dispatch(switchOrderDoneStatus(switchBody));
      //// Only fetch all orders if we want to display them otherwise does not fetch because it is unnecessary
      if (showAllOrders) await dispatch(fetchOrders());
    }
  };

  const redirect = () => {
    navigate(`/owner/order/update/${order._id}`);
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
        <button onClick={switchDoneState}>Done</button>
        <button onClick={redirect}>Update</button>
      </th>
    </tr>
  );
};

export default OpenOrderRow;
