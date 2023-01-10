import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./OwnerSidebar.module.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
}

const OwnerSidebar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <header className={`${styles.header} ${isOpen ? styles.open : ""}`}>
      <ul>
        <li>
          <NavLink
            to="/owner/orders"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/owner/shishas"
          >
            Shishas
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/owner/extras"
          >
            Extras
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/owner/deliveryHours"
          >
            Delivery Hours
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/owner/tobaccos"
          >
            Tobaccos
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default OwnerSidebar;
