import React from "react";
import styles from "./Contact.module.scss";

const Contact = () => {
  return (
    <div id="contact" className={styles.contactWrapper}>
      <h1>Kontakt</h1>
      <div className={styles.address}>
        <h2>Adresa</h2>
        <h3>Nová 418/22</h3>
        <h3>060 01 Kežmarok</h3>
      </div>
      <div className={styles.hours}>
        <h2>Otváracie Hodiny</h2>
        <h3>Pondelok - Štvrtok</h3>
        <h4>17:00 - 23:00</h4>
        <h3>Piatok - Sobota</h3>
        <h4>17:00 - 24:00</h4>
        <h3>Nedeľa</h3>
        <h3>zatvorené</h3>
      </div>
      <div className={styles.telNumber}>
        <h2>Tel. číslo</h2>
        <h3>0902664994</h3>
      </div>
    </div>
  );
};

export default Contact;
