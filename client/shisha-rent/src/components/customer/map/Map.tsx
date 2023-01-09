import React from "react";
import styles from "./Map.module.scss";

const Map = () => {
  //// This map is causing 168 issues in console
  return (
    <iframe
      title="Map"
      className={styles.map}
      src="https://maps.google.com/maps?q=cajovna%20aura%20kezmarok&t=&z=17&ie=UTF8&iwloc=&output=embed"
    ></iframe>
  );
};

export default Map;
