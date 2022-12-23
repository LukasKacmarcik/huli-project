import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { switchShowAllOrders } from "../../../app/slices/orders";
import ListOfAllOrders from "../orders/listOfAllOrders/ListOfAllOrders";
import ListOfOpenOrders from "../orders/listOfOpenOrders/ListOfOpenOrders";

const OwnerView: React.FC = () => {
  const dispatch = useAppDispatch();
  const showAllOrders = useAppSelector((state) => state.orders.showAllOrders);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <ListOfOpenOrders />
      <button onClick={() => dispatch(switchShowAllOrders())}>
        {showAllOrders ? "Hide all orders" : "Show all orders"}
      </button>
      {showAllOrders ? <ListOfAllOrders /> : null}
    </div>
  );
};

export default OwnerView;
