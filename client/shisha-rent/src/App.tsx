import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/customer/home/Home";
import OwnerView from "./components/owner/ownerView/OwnerView";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="owner" element={<OwnerView />} />
      </Route>
    </Routes>
  );
};
export default App;
