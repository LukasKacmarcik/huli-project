import { Outlet } from "react-router-dom";
import OwnerFooter from "./ownerFooter/OwnerFooter";
import OwnerNavbar from "./ownerNavbar/OwnerNavbar";
import styles from "./OwnerLayout.module.scss";
import OwnerSidebar from "./ownerSidebar/OwnerSidebar";
import { useState } from "react";

const OwnerLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.layout}>
      <OwnerNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles.contentWrapper}>
        <OwnerSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={styles.outletWrapper}>
          <Outlet />
        </div>
      </div>
      <OwnerFooter />
    </div>
  );
};
export default OwnerLayout;
