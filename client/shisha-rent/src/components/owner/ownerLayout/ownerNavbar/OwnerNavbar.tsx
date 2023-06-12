import React from "react";
import styles from "./OwnerNavbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import brightLogo from "../../../../images/logo-biela.png";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
}

const OwnerNavbar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    window.localStorage.removeItem("jwt");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className={`${styles.header} ${isOpen ? styles.open : ""}`}>
      <div>
        <Link to="/">
          <img src={brightLogo} alt="logo" loading="lazy"/>
        </Link>
      </div>

      <ul>
        <li>
          <button onClick={handleLogOut}>Log Out</button>
        </li>
      </ul>
    </header>
  );
};

export default OwnerNavbar;
