import { useAppSelector } from "../../../app/hooks";
import ListOfShishas from "../listOfShishas/ListOfShishas";
import SelectedShisha from "../shisha/selectedShisha/SelectedShisha";
import logo from "../../../images/logo-biela.png";
import rentImg from "../../../images/box.png";
import Galery from "../galery/Galery";
import { useRef } from "react";
import useElementOnScreen from "../../../hooks/useElementOnScreen";
import Contact from "../contact/Contact";
import Map from "../map/Map";
import fb from "../../../images/fb.svg";
import ig from "../../../images/ig.svg";
import styles from "./Home.module.scss";

export default function Home() {
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  //// Observables
  const aboutUsRef = useRef(null);
  const rentWrapperRef = useRef(null);
  const mapWrapperRef = useRef(null);

  const options = {
    root: null,
    rootMargin: "0px",
    treshold: 0,
  };

  const aboutUsInView = useElementOnScreen(options, aboutUsRef);
  const rentWrapperInView = useElementOnScreen(options, rentWrapperRef);
  const mapWrapperInWiew = useElementOnScreen(options, mapWrapperRef);
  ///////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className={styles.hero}>
        <div id="aboutUs">
          <div className={styles.logoWrapper}>
            <img src={logo} alt="logo" />
          </div>
          <div
            className={`${styles.aboutUsWrapper} ${
              aboutUsInView ? styles.aboutUsInView : ""
            }`}
            ref={aboutUsRef}
          >
            <div>
              <h1>O NÁS</h1>
              <p>
                Čajovňa sa nachádza v historickom centre mesta Kežmarok, so
                zachovanými historickymi prvkami a príjemným prostredím.
                Pripravíme Vám skvelý čaj, výbornú belgickú čokoládu alebo vodnú
                fajku podľa chuti.
              </p>
              <p>
                Počas letných dní Vás radi privítame aj na našej záhradnej
                terase.
              </p>
            </div>
          </div>
          <Galery />
        </div>
        <div
          id="rent"
          ref={rentWrapperRef}
          className={`${styles.rentWrapper} ${
            rentWrapperInView ? styles.rentWrappersInView : ""
          }`}
        >
          <h1>PRENÁJOM VODNEJ FAJKY</h1>
          <div className={styles.rentImgWrapper}>
            <img src={rentImg} alt="Shisha rent" />
          </div>
          <div className={styles.rentTextWrapper}>
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
          <div className={styles.reservationWrapper}>
            <h1>REZERVÁCIA</h1>
            <p>
              Pri objednávke zadávate orientačný čas, po spracovaní objednávky
              vás budeme kontaktovať. Vodnú fajku je potrebné objednať minimálne
              1 deň vopred, rozvážame nasledujúci deň do 16:00. Expresnú
              objednávku (doručenie aktuálny deň po 16:00) treba zadať do
              poznámky (+5 EUR). Rezervácia je po potvrdení záväzná. K
              objednávke sa účtuje záloha 40€, ktorá bude pri spätnom
              odovzdávaní vodnej fajky vrátená. V prípade individuálnych
              požiadaviek nás neváhajte kontaktovať Na tel. č.: 0902664994
            </p>
          </div>
        </div>
      </div>
      <ListOfShishas />
      {selectedShisha ? <SelectedShisha /> : null}
      <div id="contact">
        <Contact />
        <div
          ref={mapWrapperRef}
          className={`${styles.mapWrapper} ${
            mapWrapperInWiew ? styles.mapWrapperInWiew : ""
          }`}
        >
          <Map />
        </div>
        <div className={styles.icons}>
          <a
            href="https://www.facebook.com/kkcajovnaaura"
            target="_blank"
            rel="noreferrer"
          >
            <img src={fb} alt="facebook"></img>
          </a>
          <a
            href="https://www.instagram.com/cajovnaaurakezmarok"
            target="_blank"
            rel="noreferrer"
          >
            <img src={ig} alt="instagram"></img>
          </a>
        </div>
      </div>
    </>
  );
}
