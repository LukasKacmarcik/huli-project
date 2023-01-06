import { Outlet } from "react-router-dom";
import OwnerFooter from "./ownerFooter/OwnerFooter";
import OwnerNavbar from "./ownerNavbar/OwnerNavbar";

const OwnerLayout: React.FC = () => {
  return (
    <>
      <OwnerNavbar />
      <div style={{ paddingBottom: "40px", paddingTop: "40px" }}>
        <Outlet />
      </div>
      <OwnerFooter />
    </>
  );
};
export default OwnerLayout;
