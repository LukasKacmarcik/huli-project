import React, { useState } from "react";
import styles from "./OwnerNavbar.module.scss";
import { Link } from "react-router-dom";
import brightLogo from "../../../../images/logo-biela.png";

const OwnerNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className={`${styles.header} ${isOpen ? styles.open : ""}`}>
      <div>
        <Link to="/">
          <img src={brightLogo} alt="logo" />
        </Link>
      </div>

      <input
        type="checkbox"
        id="menu-btn"
        checked={isOpen}
        onChange={() => setIsOpen((ps) => !ps)}
      />
      <label htmlFor="menu-btn">
        <span></span>
      </label>

      <ul>
        <li>
          <Link to="/owner/orders">Orders</Link>
        </li>
        <li>
          <Link to="/owner/shishas">Shishas</Link>
        </li>
        <li>
          <Link to="/owner/extras">Extras</Link>
        </li>
        <li>
          <Link to="/owner/deliveryHours">Delivery Hours</Link>
        </li>
      </ul>
    </header>
  );
};

export default OwnerNavbar;
