import React, { useEffect, useState } from "react";
import ShishasDatePicker from "../../shisha/selectedShisha/shishasDatePicker/ShishasDatePicker";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Extra, postNewOrder } from "../../../app/slices/orders";
import Extras from "./extras/Extras";

export interface NewOrderFormData {
  userFullName: string;
  userAddress: string;
  dateOfDelivery: string | null;
  timeOfDelivery: string;
  userTelNumber: string;
  extras: string[];
  total: number;
  rememberMe: boolean;
}

const NewOrderForm: React.FC = () => {
  const selectedExtras = useAppSelector((state) => state.orders.selectedExtras);
  const selectedShishaPrice = useAppSelector(
    (state) => state.shishas.selectedShisha?.price
  );
  const dateOfDelivery = useAppSelector((state) => state.orders.newOrderDate);
  console.log("date: ", dateOfDelivery);

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<NewOrderFormData>({
    userFullName: "",
    userAddress: "",
    dateOfDelivery: dateOfDelivery,
    timeOfDelivery: "",
    userTelNumber: "",
    extras: [],
    total: 0,
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: atach shisha _id to formData
    //TODO: atach extras to formData
    dispatch(postNewOrder(formData));
    console.log("handlling submit");
  };

  const calcTotal = (arrOfExtras: Extra[]) => {
    return arrOfExtras.reduce(
      (total: number, extra: Extra) => (total += extra.price),
      selectedShishaPrice || 0
    );
  };

  useEffect(() => {
    setFormData((ps) => {
      return {
        ...ps,
        total: calcTotal(selectedExtras),
      };
    });
  }, [selectedExtras, selectedShishaPrice]);
  console.log(formData);
  return (
    <>
      <ShishasDatePicker />
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
      <h3>TOTAL: {formData.total}</h3>
      <Extras />
    </>
  );
};

export default NewOrderForm;
