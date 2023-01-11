import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchOrders } from "../../../../app/slices/orders";
import OrderRow from "./orderRow/OrderRow";
import styles from "./ListOfAllOrders.module.scss";

const ListOfAllOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const allOrders = useAppSelector((state) => state.orders.orders);
  const mapedAllOrders = allOrders?.map((order) => {
    return <OrderRow key={order._id} order={order} />;
  });
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>City</th>
            <th>Address</th>
            <th>Tel. Number</th>
            <th>Shisha</th>
            <th>Extras</th>
            <th>Tobacco</th>
            <th>Total</th>
            <th>User Note</th>
            <th>Owner Note</th>
            <th>Date Of Delivery</th>
            <th>Hour Of Delivery</th>
            <th>Done</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{mapedAllOrders}</tbody>
      </table>
    </div>
  );
};

export default ListOfAllOrders;
