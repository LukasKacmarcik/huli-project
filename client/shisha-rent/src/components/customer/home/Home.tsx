import { useAppSelector } from "../../../app/hooks";
import ListOfShishas from "../listOfShishas/ListOfShishas";
import SelectedShisha from "../shisha/selectedShisha/SelectedShisha";
import logo from "../../../images/logo-biela.png";
import rentImg from "../../../images/rent.jpg";
import Galery from "../galery/Galery";
import { useRef, useState } from "react";
import useElementOnScreen from "../../../hooks/useElementOnScreen";
import Contact from "../contact/Contact";
import Map from "../map/Map";
import fb from "../../../images/fb.svg";
import ig from "../../../images/ig.svg";
import styles from "./Home.module.scss";
import Modal from "../modal/Modal";

export default function Home() {
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  //// Modal
  const [openModal, setOpenModal] = useState(true);

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
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
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
              Vodnú fajku podľa Vášho výberu Vám dovezieme až k vám domov.
              Shisha box obsahuje všetko potrebné príslušenstvo, ktoré budete
              potrebovať.
            </p>
            <p>
              Takže stačí zvoliť dátum, čas a vodnú fajku podľa Vašich
              preferencií a vkusu. O všetko ostatné vrátane vyzdvihnutia vodnej
              fajky v nasledujúci deň sa už postaráme my.
            </p>
            <p>
              Vodná fajka sa objednáva na 24 hodín. Ak by ste ju chceli použiť
              viackrát môžete si doobjednať nabitú korunku a uhlíky navyše,
              prípadne použiť svoj vlastný tabak.
            </p>
          </div>
          <div className={styles.reservationWrapper}>
            <h1>REZERVÁCIA</h1>
            <p>
              <p>
                Pri objednávke zadávate orientačný čas, po spracovaní objednávky
                vás budeme kontaktovať.
              </p>
              Vodnú fajku je potrebné objednať v dostatočnom predstihu,
              rozvážame každý deň do 16:00. Od 17:00 je možné si vodnú fajku
              prísť vyzdvihnúť na našu prevádzku Čajovňa Aura v Kežmarku.
              Rezervácia je po potvrdení záväzná. K objednávke sa účtuje záloha
              podľa typu vodnej fajky, ktorá bude pri spätnom odovzdávaní vodnej
              fajky bez poškodení vrátená.
              <p>
                V prípade prenájmu na viac dní alebo iných individuálnych
                požiadaviek nás neváhajte kontaktovať na tel. č.: 0902 664 994
                alebo mailom cajovnaaura@gmail.com.
              </p>
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
