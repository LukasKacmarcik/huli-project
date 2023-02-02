import { useState } from "react";
import styles from "./Modal.module.scss";

interface Props {
  openModal: boolean;
  setOpenModal: Function;
}

const Modal: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const [rememberModal, setRememberModal] = useState(false);

  const handleYes = () => {
    setOpenModal((ps: boolean) => !ps);
    if (rememberModal) localStorage.setItem("modalAgeOver", "yes");
  };

  const ageOver = localStorage.getItem("modalAgeOver") === "yes";

  return openModal && !ageOver ? (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <h1>Rezervácia vodnej fajky možná od 18 rokov!</h1>
        <p>Zakliknutím tlačidla ÁNO prehlasujem, že mám 18 a viac rokov</p>
        <div className={styles.buttons}>
          <button onClick={handleYes}>Ano</button>
          <button
            onClick={() =>
              alert(
                "Pre vstup na túto stránku je potrebné mať 18 alebo viac rokov!"
              )
            }
          >
            Nie
          </button>
        </div>
        <label htmlFor="modalRemember">Zapamätať</label>
        <input
          type="checkbox"
          id="modalRemember"
          name="modalRemember"
          checked={rememberModal}
          onChange={() => setRememberModal((ps) => !ps)}
        />
      </div>
    </div>
  ) : null;
};

export default Modal;
