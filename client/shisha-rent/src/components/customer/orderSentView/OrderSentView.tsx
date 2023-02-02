import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrderSentView.module.scss";

const OrderSentView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h1>Vďaka za objednávku</h1>
      <p>
        Ďakujeme za vytvorenie objednávky. Pracujeme na jej vybavení, po
        spracovaní Vás budeme kontaktovať.
      </p>
      <button onClick={() => navigate("/")}>Späť na hlavnu stránku</button>
    </div>
  );
};

export default OrderSentView;
