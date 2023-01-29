import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  fetchOrders,
  Order,
  switchOrderDoneStatus,
} from "../../../../../app/slices/orders";

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
      <td>{order.userFullName}</td>
      <td>{order.userCity}</td>
      <td>{order.userAddress}</td>
      <td>{order.userTelNumber}</td>
      <td>{order.shishaName}</td>
      <td>{extrasInString}</td>
      <td>{order.tobacco.name}</td>
      <td>{order.total}</td>
      <td>{order.userNote}</td>
      <td>{order.ownerNote}</td>
      <td>{new Date(order.dateOfDelivery).toLocaleDateString()}</td>
      <td>{new Date(order.dateOfDelivery).getHours()}</td>
      <td>
        <div>
          <button onClick={switchDoneState}>Done</button>
          <button onClick={redirect}>Update</button>
        </div>
      </td>
    </tr>
  );
};

export default OpenOrderRow;
