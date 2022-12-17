import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchOpenOrders } from "../../../app/slices/orders";
import OpenOrderRow from "./openOrderRow/OpenOrderRow";

const ListOfOpenOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const openOrders = useAppSelector((state) => state.orders.openOrders);
  const mapedOpenOrders = openOrders?.map((order) => {
    return <OpenOrderRow order={order} />;
  });
  useEffect(() => {
    dispatch(fetchOpenOrders());
  }, [dispatch]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Address</th>
            <th>Tel. Number</th>
            <th>Extras</th>
            <th>Total</th>
            <th>User Note</th>
            <th>Owner Note</th>
            <th>Date Of Delivery</th>
            <th>Hour Of Delivery</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{mapedOpenOrders}</tbody>
      </table>
    </div>
  );
};

export default ListOfOpenOrders;
