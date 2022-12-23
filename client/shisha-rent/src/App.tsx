import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/customer/home/Home";
import OwnerView from "./components/owner/ownerView/OwnerView";
import OrderUpdate from "./components/owner/orders/orderUpdate/OrderUpdate";
import ExtrasView from "./components/owner/extrasView/ExtrasView";
import DeliveryHoursView from "./components/owner/deliveryHoursView/DeliveryHoursView";
import ShishasView from "./components/owner/shishasView/ShishasView";
import ShishaUpdate from "./components/owner/shishasView/shishaUpdate/ShishaUpdate";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="owner" element={<OwnerView />} />
        <Route path="owner/order/update/:orderId" element={<OrderUpdate />} />
        <Route path="owner/shishas" element={<ShishasView />} />
        <Route
          path="owner/shisha/update/:shishaId"
          element={<ShishaUpdate />}
        />
        <Route path="owner/extras" element={<ExtrasView />} />
        <Route path="owner/deliveryHours" element={<DeliveryHoursView />} />
      </Route>
    </Routes>
  );
};
export default App;
