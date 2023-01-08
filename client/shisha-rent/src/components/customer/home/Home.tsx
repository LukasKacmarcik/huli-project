import { useAppSelector } from "../../../app/hooks";
import ListOfShishas from "../listOfShishas/ListOfShishas";
import SelectedShisha from "../shisha/selectedShisha/SelectedShisha";
import logo from "../../../images/logo-biela.png";
import rentImg from "../../../images/box.png";
import styles from "./Home.module.scss";
import Galery from "../galery/Galery";

export default function Home() {
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.aboutUsWrapper}>
          <h1>O NÁS</h1>
          <p>
            Čajovňa sa nachádza v historickom centre mesta Kežmarok, so
            zachovanými historickymi prvkami a príjemným prostredím. Pripravíme
            Vám skvelý čaj, výbornú belgickú čokoládu alebo vodnú fajku podľa
            chuti.
          </p>
          <p>
            Počas letných dní Vás radi privítame aj na našej záhradnej terase.
          </p>
        </div>
        <Galery />
        <div className={styles.rentWrapper}>
          <h1>PRENÁJOM VODNEJ FAJKY</h1>
          <div className={styles.rentImgWrapper}>
            <img src={rentImg} alt="Shisha rent" />
          </div>
          <div>
            <p>
              Dovezieme Vám Vami vybraný typ vodnej fajky so všetkým potrebným
              príslušenstvom priamo k Vašim dverám. Už bude treba len rozpáliť
              uhlíky a môžete si užiť session v pohodlí domova.
            </p>
            <p>
              Počas jedného nájmu (do 24 hod.) môžete vodnú fajku využiť hneď
              niekoľkokrát.
            </p>
            <p>
              Môžete si doobjednať nápoje, snacky, extra korunky s príchuťami,
              poprípade iné zaujímavé doplnky.
            </p>
          </div>
        </div>
      </div>
      <ListOfShishas />
      {selectedShisha ? <SelectedShisha /> : null}
    </>
  );
}
