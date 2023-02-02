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
        <h1>Služby neposkytujeme osobám mladším ako 18 rokov!</h1>
        <p>
          Prehlasujem, že mám 18 rokov alebo viac, a som si vedomý(á), že
          stránka obsahuje tabakové výrobky a výrobky, ktoré sú určené na
          fajčenie a neobsahujú tabak.
        </p>
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
