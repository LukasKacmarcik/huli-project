import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { switchShowAllOrders } from "../../../../app/slices/orders";
import ListOfAllOrders from "../listOfAllOrders/ListOfAllOrders";
import ListOfOpenOrders from "../listOfOpenOrders/ListOfOpenOrders";
import styles from "./OrdersView.module.scss";

const OrdersView: React.FC = () => {
  const dispatch = useAppDispatch();
  const showAllOrders = useAppSelector((state) => state.orders.showAllOrders);

  return (
    <div className={styles.wrapper}>
      <ListOfOpenOrders />
      <button
        className={styles.showAllBtn}
        onClick={() => dispatch(switchShowAllOrders())}
      >
        {showAllOrders ? "Hide all orders" : "Show all orders"}
      </button>
      {showAllOrders ? <ListOfAllOrders /> : null}
    </div>
  );
};

export default OrdersView;
