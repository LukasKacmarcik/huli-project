import { Outlet } from "react-router-dom";
import Footer from "../../footer/Footer";
import OwnerNavbar from "./ownerNavbar/OwnerNavbar";

const OwnerLayout: React.FC = () => {
  return (
    <>
      <OwnerNavbar />
      <div style={{ paddingBottom: "40px", paddingTop: "40px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default OwnerLayout;
