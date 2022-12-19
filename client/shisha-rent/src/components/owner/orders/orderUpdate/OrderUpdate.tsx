import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchOrders, updateOrder } from "../../../../app/slices/orders";

const OrderUpdate: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errMessages = useAppSelector((state) => state.orders.messages);

  //// Get orderToUpdate from open orders
  const orderStatus = useAppSelector((state) => state.orders.status);
  let orderToUpdate = useAppSelector((state) => state.orders.openOrders)?.find(
    (order) => order._id === params.orderId
  );
  //// Get orderToUpdateFromAllOrders from all orders
  const orderToUpdateFromAllOrders = useAppSelector(
    (state) => state.orders.orders
  )?.find((order) => order._id === params.orderId);
  //// If we are updating openOrder we use order from openOrders arr to prefill form
  //// but if we are updating order that is not in openOrder arr than we get it from allOrders arr.
  if (!orderToUpdate) {
    orderToUpdate = orderToUpdateFromAllOrders;
  }

  const defaultFrormData: any = {
    _id: "",
    ownerNote: "",
    userAddress: "",
    userFullName: "",
    userNote: "",
    userTelNumber: "",
  };
  const [formData, setFormData] = useState(defaultFrormData);

  //// If page is reloaded we fetch orders so we can prefill form with actual data
  useEffect(() => {
    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, orderStatus]);

  useEffect(() => {
    if (orderToUpdate !== undefined)
      setFormData({
        _id: orderToUpdate._id,
        ownerNote: orderToUpdate.ownerNote,
        userAddress: orderToUpdate.userAddress,
        userFullName: orderToUpdate.userFullName,
        userNote: orderToUpdate.userNote,
        userTelNumber: orderToUpdate.userTelNumber,
      });
  }, [orderToUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((ps: any) => {
      return {
        ...ps,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateOrder(formData));
    if (Object.keys(errMessages).length === 0) {
      console.log("Order sucessfully updated");
      navigate(-1);
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <form onSubmit={onSubmit}>
        <label htmlFor="userFullName">Customer</label>
        <input
          type="text"
          id="userFullName"
          name="userFullName"
          value={formData.userFullName}
          onChange={handleChange}
        />
        <label htmlFor="userAddress">Address</label>
        <input
          type="text"
          id="userAddress"
          name="userAddress"
          value={formData.userAddress}
          onChange={handleChange}
        />
        <label htmlFor="userTelNumber">Tel. Number</label>
        <input
          type="text"
          id="userTelNumber"
          name="userTelNumber"
          value={formData.userTelNumber}
          onChange={handleChange}
        />
        <label htmlFor="userNote">User Note</label>
        <input
          type="text"
          id="userNote"
          name="userNote"
          value={formData.userNote}
          onChange={handleChange}
        />
        <label htmlFor="ownerNote">Owner Note</label>
        <input
          type="text"
          id="ownerNote"
          name="ownerNote"
          value={formData.ownerNote}
          onChange={handleChange}
        />
        <div>
          <button>Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderUpdate;
