import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";
import brightLogo from "../../../../images/logo-biela.png";

const Navbar: React.FC = () => {
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
          <Link to="#aboutUs">O NAS</Link>
        </li>
        <li>
          <Link to="#rent">PRENAJOM</Link>
        </li>
        <li>
          <Link to="Contact"></Link>
        </li>
        <li>
          <Link to="/owner/orders">Owner View</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
