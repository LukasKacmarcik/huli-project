import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../app/hooks";
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
  done: boolean;
}

const OrderRow: React.FC<OrderProps> = ({ order }) => {
  const navigate = useNavigate();
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
      <td>{order.done ? "Yes" : "No"}</td>
      <td>
        <div>
          <button onClick={switchDoneState}>Switch done status</button>
          <button onClick={redirect}>Update</button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
