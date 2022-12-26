import React, { useEffect, useState } from "react";
import ShishasDatePicker from "../../customer/shisha/selectedShisha/shishasDatePicker/ShishasDatePicker";
import formStyle from "../form.module.scss";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  Extra,
  fetchDeliveryHours,
  fetchExtras,
  postNewOrder,
} from "../../../app/slices/orders";
import Extras from "./extras/Extras";

export interface NewOrderFormData {
  shishaName: string | undefined;
  userFullName: string;
  userAddress: string;
  dateOfDelivery: string | null;
  userTelNumber: string;
  userEmailAddress: string;
  extras: Extra[];
  total: number;
  userNote?: string;
}

const NewOrderForm: React.FC = () => {
  const selectedExtras = useAppSelector((state) => state.orders.selectedExtras);
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );
  const selectedShishaPrice = selectedShisha?.price;
  // const selectedShishaPrice = useAppSelector(
  //   (state) => state.shishas.selectedShisha?.price
  // );
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
    shishaName: selectedShisha?.name,
    userFullName: userData?.userFullName || "",
    userAddress: userData?.userAddress || "",
    dateOfDelivery: dateOfDelivery,
    userTelNumber: userData?.userTelNumber || "",
    userEmailAddress: userData?.userEmailAddress || "",
    extras: [],
    total: 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rememberMe === true) {
      window.localStorage.setItem("userData", JSON.stringify(formData));
    }
    const orderData = formData;
    orderData.shishaName = selectedShisha?.name;
    orderData.extras = selectedExtras;
    orderData.dateOfDelivery = dateOfDelivery;
    //console.log(orderData);

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
    dispatch(fetchExtras());
    dispatch(fetchDeliveryHours());
  }, [selectedShisha, dispatch]);

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
      <div className={formStyle.formWrapper}>
        <h1>New Order</h1>
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
          <label htmlFor="userEmailAddress">Email</label>
          <input
            id="userEmailAddress"
            type="text"
            name="userEmailAddress"
            value={formData.userEmailAddress}
            onChange={(e) =>
              setFormData({ ...formData, userEmailAddress: e.target.value })
            }
          />
          <label htmlFor="userNote">Poznámka k objednávke</label>
          <textarea
            id="userNote"
            name="userNote"
            value={formData.userNote}
            placeholder="Sem môžte uviesť svoju poznámku k objednávke"
            onChange={(e) =>
              setFormData({ ...formData, userNote: e.target.value })
            }
          ></textarea>
          <button type="submit">Objednať</button>
        </form>
      </div>
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
