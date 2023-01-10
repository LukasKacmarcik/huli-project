import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/customer/layout/Layout";
import Home from "./components/customer/home/Home";
import OrderUpdate from "./components/owner/orders/orderUpdate/OrderUpdate";
import ExtrasView from "./components/owner/extrasView/ExtrasView";
import DeliveryHoursView from "./components/owner/deliveryHoursView/DeliveryHoursView";
import ShishasView from "./components/owner/shishasView/ShishasView";
import ShishaUpdate from "./components/owner/shishasView/shishaUpdate/ShishaUpdate";
import OrdersView from "./components/owner/orders/ordersView/OrdersView";
import OwnerLayout from "./components/owner/ownerLayout/OwnerLayout";
import TobaccosView from "./components/owner/tobaccosView/TobaccosView";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/owner" element={<OwnerLayout />}>
        <Route path="orders" element={<OrdersView />} />
        <Route path="order/update/:orderId" element={<OrderUpdate />} />
        <Route path="shishas" element={<ShishasView />} />
        <Route path="shisha/update/:shishaId" element={<ShishaUpdate />} />
        <Route path="extras" element={<ExtrasView />} />
        <Route path="tobaccos" element={<TobaccosView />} />
        <Route path="deliveryHours" element={<DeliveryHoursView />} />
      </Route>
    </Routes>
  );
};
export default App;
