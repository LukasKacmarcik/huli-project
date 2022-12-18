import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { switchShowAllOrders } from "../../../app/slices/orders";
import ListOfAllOrders from "../listOfAllOrders/ListOfAllOrders";
import NewShishaForm from "../../forms/newShishaForm/NewShishaForm";
import ListOfOpenOrders from "../listOfOpenOrders/ListOfOpenOrders";

const OwnerView: React.FC = () => {
  const dispatch = useAppDispatch();
  const showAllOrders = useAppSelector((state) => state.orders.showAllOrders);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <NewShishaForm />
      <ListOfOpenOrders />
      <button onClick={() => dispatch(switchShowAllOrders())}>
        {showAllOrders ? "Hide all orders" : "Show all orders"}
      </button>
      {showAllOrders ? <ListOfAllOrders /> : null}
    </div>
  );
};

export default OwnerView;
