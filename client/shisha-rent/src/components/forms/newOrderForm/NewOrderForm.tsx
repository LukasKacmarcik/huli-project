import React, { useEffect, useState } from "react";
import ShishasDatePicker from "../../shisha/selectedShisha/shishasDatePicker/ShishasDatePicker";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Extra, postNewOrder } from "../../../app/slices/orders";
import Extras from "./extras/Extras";

export interface NewOrderFormData {
  shishaId: string | undefined;
  userFullName: string;
  userAddress: string;
  dateOfDelivery: string | null;
  userTelNumber: string;
  extras: Extra[];
  total: number;
}

const NewOrderForm: React.FC = () => {
  const selectedExtras = useAppSelector((state) => state.orders.selectedExtras);
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );
  const selectedShishaPrice = useAppSelector(
    (state) => state.shishas.selectedShisha?.price
  );
  const dateOfDelivery = useAppSelector((state) => state.orders.newOrderDate);

  const dispatch = useAppDispatch();

  //// Remember me checkbox state
  const [rememberMe, setRememberMe] = useState<boolean>(
    window.localStorage.getItem("rememberMe") === "true" ? true : false
  );
  //// Loading userData from localStorage
  const userData: NewOrderFormData | null =
    window.localStorage.getItem("userData") !== null
      ? JSON.parse(window.localStorage.getItem("userData") || "")
      : null;

  //// Form data state
  const [formData, setFormData] = useState<NewOrderFormData>({
    shishaId: selectedShisha?._id,
    userFullName: userData?.userFullName || "",
    userAddress: userData?.userAddress || "",
    dateOfDelivery: dateOfDelivery,
    userTelNumber: userData?.userTelNumber || "",
    extras: [],
    total: 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rememberMe === true) {
      window.localStorage.setItem("userData", JSON.stringify(formData));
    }
    const orderData = formData;
    orderData.shishaId = selectedShisha?._id;
    orderData.extras = selectedExtras;
    orderData.dateOfDelivery = dateOfDelivery;
    // console.log(orderData);

    dispatch(postNewOrder(orderData));
    // console.log("handlling submit");
  };

  const calcTotal = (
    arrOfExtras: Extra[],
    selectedShishaPrice: number | undefined
  ) => {
    return arrOfExtras.reduce(
      (total: number, extra: Extra) => (total += extra.price),
      selectedShishaPrice || 0
    );
  };

  useEffect(() => {
    setFormData((ps) => {
      return {
        ...ps,
        total: calcTotal(selectedExtras, selectedShishaPrice),
      };
    });
  }, [selectedExtras, selectedShishaPrice]);

  useEffect(() => {
    if (rememberMe === true) {
      window.localStorage.setItem("rememberMe", "true");
    } else {
      window.localStorage.setItem("rememberMe", "false");
      window.localStorage.removeItem("userData");
    }
  }, [rememberMe]);

  return (
    <>
      <ShishasDatePicker />
      <Extras />
      <form onSubmit={handleSubmit}>
        <label htmlFor="userFullName">Meno a priezvisko</label>
        <input
          id="userFullName"
          type="text"
          name="userFullName"
          value={formData.userFullName}
          onChange={(e) =>
            setFormData({ ...formData, userFullName: e.target.value })
          }
        />
        <label htmlFor="userAddress">Adresa</label>
        <input
          id="userAddress"
          type="text"
          name="userAddress"
          value={formData.userAddress}
          onChange={(e) =>
            setFormData({ ...formData, userAddress: e.target.value })
          }
        />
        <label htmlFor="userTelNumber">Tel. cislo</label>
        <input
          id="userTelNumber"
          type="text"
          name="userTelNumber"
          value={formData.userTelNumber}
          onChange={(e) =>
            setFormData({ ...formData, userTelNumber: e.target.value })
          }
        />

        <button type="submit">Submit</button>
      </form>
      <label htmlFor="rememberMe">Pametaj si ma</label>
      <input
        checked={rememberMe}
        onChange={() => setRememberMe((ps) => !ps)}
        type="checkbox"
        name="rememberMe"
        id="rememberMe"
      />
      <h3>TOTAL: {formData.total}</h3>
    </>
  );
};

export default NewOrderForm;
