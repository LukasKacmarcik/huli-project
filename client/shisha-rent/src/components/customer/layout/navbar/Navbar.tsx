import React, { useState } from "react";
import styles from "./navbar.module.scss";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Link as AncorLink } from "react-scroll";
import brightLogo from "../../../../images/logo-biela.png";
import { Link } from "react-router-dom";
import "./Navbar.css";

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
          <AncorLink
            // activeStyle={{ borderTop: "1px solid green" }}
            to="aboutUs"
            isDynamic={true}
            spy={true}
            smooth={true}
            offset={-100}
            duration={800}
          >
            O NAS
          </AncorLink>
        </li>
        <li>
          <AncorLink
            to="rent"
            isDynamic={true}
            spy={true}
            smooth={true}
            offset={-100}
            duration={800}
          >
            PRENAJOM
          </AncorLink>
        </li>
        <li>
          <AncorLink
            to="contact"
            isDynamic={true}
            spy={true}
            smooth={true}
            offset={-100}
            duration={800}
          >
            KONTAKT
          </AncorLink>
        </li>
        <li>
          <Link to="/owner/orders">Owner View</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
