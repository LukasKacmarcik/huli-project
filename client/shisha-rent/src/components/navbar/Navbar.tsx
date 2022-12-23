import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
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
        <Link to="/">LOGO</Link>
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
          <Link to="owner">Owner View</Link>
        </li>
        <li>
          <Link to="owner/extras">Extras</Link>
        </li>
        <li>
          <Link to="owner/deliveryHours">Delivery Hours</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#">Portfolio</a>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
