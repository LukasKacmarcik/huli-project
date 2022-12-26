import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "../../footer/Footer";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingBottom: "40px", paddingTop: "40px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Layout;
