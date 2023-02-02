import React from "react";
import styles from "./Map.module.scss";
import fakeMap from "../../../images/fakeMap2.png";

const Map = () => {
  //// Iframe is collecting cookies and for that we would need some cookie consent from user.
  return (
    // <iframe
    //   title="Map"
    //   className={styles.map}
    //   src="https://maps.google.com/maps?q=cajovna%20aura%20kezmarok&t=&z=17&ie=UTF8&iwloc=&output=embed"
    // ></iframe>

    <a
      className={styles.map}
      target="_blank"
      rel="noreferrer"
      href="https://www.google.com/maps/place/%C4%8Cajov%C5%88a+AurA+Ke%C5%BEmarok/@49.139452,20.431984,17z/data=!4m5!3m4!1s0x0:0x47e430b22c1ae443!8m2!3d49.1393765!4d20.4320678?hl=en-US"
    >
      <img src={fakeMap} alt="mapa"></img>
    </a>
  );
};

export default Map;
