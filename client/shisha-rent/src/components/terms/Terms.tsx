import React from "react";
import styles from "./Terms.module.scss";

const Terms: React.FC = () => {
  return (
    <>
      <div>
        <div className={styles.wrapper}>
          <h5 className={styles.f}>VII. Final Provisions</h5>
          <ol>
            <li>VOP takes effect on February 15, 2022.</li>
            <li>
              If the Contract is signed by a physical person on the tenant side
              who is not a businessman, the Contracting Parties have agreed
              explicitly that the obligation relationship established by the
              Contract will be governed by Act No. 513/1991 Commercial Code in
              its later regulations.
            </li>
            <li>
              If some provisions of the Contract are not fully or partially
              valid or effective or later lose validity or effectiveness, the
              validity or effectiveness of the other provisions of the Contract
              is not affected. The legal regulation that, if legally possible,
              is closest to the meaning and purpose of the Contract shall be
              applied instead of the invalid or ineffective provisions of the
              Contract to fill the gaps.
            </li>
            <li>
              VOP, together with the Delivery Protocol and the Contract on the
              rental of movable property, make up an inseparable part of the
              Contract. The Price List of the lessor valid at the time of the
              Contract is also part of the Contractual relationship of the
              Contracting Parties, which is published on the lessor's website.
            </li>
            <li>Deviant provisions in the Contract have priority over VOP.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Terms;
