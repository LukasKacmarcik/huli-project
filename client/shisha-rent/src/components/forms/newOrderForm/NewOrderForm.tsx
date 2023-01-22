import React, { useEffect, useState } from "react";
import ShishasDatePicker from "../../customer/shisha/selectedShisha/shishasDatePicker/ShishasDatePicker";
import styles from "./NewOrderForm.module.scss";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  Extra,
  fetchCities,
  fetchDeliveryHours,
  fetchExtras,
  postNewOrder,
  Tobacco,
} from "../../../app/slices/orders";
import Extras from "./extras/Extras";
import Tobaccos from "./tobaccos/Tobaccos";
import { useNavigate } from "react-router-dom";

export interface NewOrderFormData {
  shishaName: string | undefined;
  userFullName: string;
  userCity: string;
  userAddress: string;
  dateOfDelivery: string | null;
  userTelNumber: string;
  userEmailAddress: string;
  extras: Extra[];
  tobacco: Tobacco | null;
  total: number;
  userNote?: string;
}

const NewOrderForm: React.FC = () => {
  const navigate = useNavigate();

  const selectedExtras = useAppSelector((state) => state.orders.selectedExtras);
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );
  const selectedShishaPrice = selectedShisha?.price;

  const { selectedTobacco } = useAppSelector((state) => state.orders);

  const messages = useAppSelector((state) => state.orders.messages);

  const dateOfDelivery = useAppSelector((state) => state.orders.newOrderDate);

  const offeredCities = useAppSelector((state) => state.orders.offeredCities);

  const dispatch = useAppDispatch();

  //// DepositAgreement me checkbox state
  const [depositAgreement, setDepositAgreement] = useState<boolean>(false);
  //// Agreement me checkbox state
  const [agreement, setAgreement] = useState<boolean>(false);
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
    userCity: userData?.userCity || "Kežmarok",
    userAddress: userData?.userAddress || "",
    dateOfDelivery: dateOfDelivery,
    userTelNumber: userData?.userTelNumber || "",
    userEmailAddress: userData?.userEmailAddress || "",
    extras: [],
    tobacco: null,
    total: 0,
  });

  const listOfCityOptions = offeredCities.map((city) => {
    return (
      <option key={city._id} value={city.name}>
        {city.name}
      </option>
    );
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (agreement && depositAgreement) {
      if (rememberMe === true) {
        window.localStorage.setItem("userData", JSON.stringify(formData));
      }
      const orderData = formData;
      orderData.shishaName = selectedShisha?.name;
      orderData.extras = selectedExtras;
      orderData.dateOfDelivery = dateOfDelivery;
      orderData.tobacco = selectedTobacco;

      try {
        await dispatch(postNewOrder(orderData)).unwrap();
        navigate("/orderSent");
      } catch (error) {
        console.error("new order failed");
      }
    } else {
      console.log("have to agree with deposit and rules");
    }
  };

  const tobaccoPrice = useAppSelector((state) => state.orders.tobaccoPrice);

  const selectedCity = offeredCities.find(
    (city) => city.name === formData.userCity
  );

  const priceOfSelectedCity = selectedCity?.price || 0;

  const calcTotal = (
    arrOfExtras: Extra[],
    selectedShishaPrice: number | undefined,
    tobaccoPrice: number = 0,
    priceOfSelectedCity: number
  ) => {
    return arrOfExtras.reduce(
      (total: number, extra: Extra) => (total += extra.price),
      (selectedShishaPrice || 0) + tobaccoPrice + priceOfSelectedCity
    );
  };

  useEffect(() => {
    dispatch(fetchExtras());
    dispatch(fetchDeliveryHours());
    dispatch(fetchCities());
  }, [selectedShisha, dispatch]);

  useEffect(() => {
    setFormData((ps) => {
      return {
        ...ps,
        total: calcTotal(
          selectedExtras,
          selectedShishaPrice,
          tobaccoPrice,
          priceOfSelectedCity
        ),
      };
    });
  }, [selectedExtras, selectedShishaPrice, tobaccoPrice, priceOfSelectedCity]);

  useEffect(() => {
    if (rememberMe === true) {
      window.localStorage.setItem("rememberMe", "true");
    } else {
      window.localStorage.setItem("rememberMe", "false");
      window.localStorage.removeItem("userData");
    }
  }, [rememberMe]);

  return (
    <div className={styles.newOrderFormWrapper}>
      <ShishasDatePicker />
      <Extras />
      <Tobaccos />
      <div className={styles.wrapper}>
        <div className={styles.formWrapper}>
          <h1>Objednávka</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="userFullName">Meno a priezvisko</label>
            <input
              className={
                messages.ordeUserFullNameError ? styles.inputError : ""
              }
              id="userFullName"
              type="text"
              name="userFullName"
              value={formData.userFullName}
              onChange={(e) =>
                setFormData({ ...formData, userFullName: e.target.value })
              }
            />
            <p className={styles.error}>{messages.ordeUserFullNameError}</p>
            <label htmlFor="userCity">Mesto</label>
            <select
              id="userCity"
              name="userCity"
              value={formData.userCity}
              onChange={(e) =>
                setFormData({ ...formData, userCity: e.target.value })
              }
            >
              {listOfCityOptions}
            </select>
            <label htmlFor="userAddress">Adresa</label>
            <input
              className={messages.ordeUserAddressError ? styles.inputError : ""}
              id="userAddress"
              type="text"
              name="userAddress"
              value={formData.userAddress}
              onChange={(e) =>
                setFormData({ ...formData, userAddress: e.target.value })
              }
            />
            <p className={styles.error}>{messages.ordeUserAddressError}</p>
            <label htmlFor="userTelNumber">Tel. cislo</label>
            <input
              className={
                messages.ordeUserTelNumberError ? styles.inputError : ""
              }
              id="userTelNumber"
              type="text"
              name="userTelNumber"
              value={formData.userTelNumber}
              onChange={(e) =>
                setFormData({ ...formData, userTelNumber: e.target.value })
              }
            />
            <p className={styles.error}>{messages.ordeUserTelNumberError}</p>
            <label htmlFor="userEmailAddress">Email</label>
            <input
              className={
                messages.ordeUserEmailAddressError ? styles.inputError : ""
              }
              id="userEmailAddress"
              type="text"
              name="userEmailAddress"
              value={formData.userEmailAddress}
              onChange={(e) =>
                setFormData({ ...formData, userEmailAddress: e.target.value })
              }
            />
            <p className={styles.error}>{messages.ordeUserEmailAddressError}</p>
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
            <label htmlFor="agreement">Súhlasím s obchodnými podmienkamy</label>
            <input
              checked={agreement}
              onChange={() => setAgreement((ps) => !ps)}
              type="checkbox"
              name="agreement"
              id="agreement"
            />
            <label htmlFor="depositAgreement">
              Súhlas o odovzdaní zálohy vo výške 40e pri prevzatí, ktorá bude
              vrátená po odovzdaní a skontrolovaní.
            </label>
            <input
              checked={depositAgreement}
              onChange={() => setDepositAgreement((ps) => !ps)}
              type="checkbox"
              name="depositAgreement"
              id="depositAgreement"
            />
            <label htmlFor="rememberMe">Pametaj si ma</label>
            <input
              checked={rememberMe}
              onChange={() => setRememberMe((ps) => !ps)}
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
            />
            <h4>TOTAL: {formData.total} €</h4>
            <button type="submit">Objednať</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewOrderForm;
