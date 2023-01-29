import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchOpenOrders } from "../../../../app/slices/orders";
import OpenOrderRow from "./openOrderRow/OpenOrderRow";
import styles from "../../../forms/tableStyle.module.scss";

const ListOfOpenOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const openOrders = useAppSelector((state) => state.orders.openOrders);
  const mapedOpenOrders = openOrders?.map((order) => {
    return <OpenOrderRow key={order._id} order={order} />;
  });
  useEffect(() => {
    dispatch(fetchOpenOrders());
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{mapedOpenOrders}</tbody>
      </table>
    </div>
  );
};

export default ListOfOpenOrders;
