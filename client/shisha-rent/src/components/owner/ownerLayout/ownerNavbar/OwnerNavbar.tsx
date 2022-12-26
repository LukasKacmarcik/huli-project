import React, { useEffect, useState } from "react";
import styles from "./OwnerNavbar.module.scss";
import { Link } from "react-router-dom";
import darkLogo from "../../../../images/logo-cierna.png";
import brightLogo from "../../../../images/logo-biela.png";

const OwnerNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <header
      className={`${styles.header} ${isOpen ? styles.open : ""} ${
        isScrolled ? styles.scrolled : ""
      }`}
    >
      <div>
        <Link to="/">
          {isScrolled ? (
            <img src={brightLogo} alt="logo" />
          ) : (
            <img src={darkLogo} alt="logo" />
          )}
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
