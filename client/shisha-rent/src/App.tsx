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
import CityView from "./components/owner/citiesView/CityView";
import LoginForm from "./components/owner/login/LoginForm";
import RequireAuth from "./components/owner/requireAuth/RequireAuth";
import OrderSentView from "./components/customer/orderSentView/OrderSentView";
import Terms from "./components/terms/Terms";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/orderSent" element={<OrderSentView />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Layout />}>
        <Route path="/vop" element={<Terms />} />
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<RequireAuth allowedId={"63c124c0b0a2394b66edfb99"} />}>
        <Route path="/owner" element={<OwnerLayout />}>
          <Route path="orders" element={<OrdersView />} />
          <Route path="order/update/:orderId" element={<OrderUpdate />} />
          <Route path="shishas" element={<ShishasView />} />
          <Route path="shisha/update/:shishaId" element={<ShishaUpdate />} />
          <Route path="extras" element={<ExtrasView />} />
          <Route path="tobaccos" element={<TobaccosView />} />
          <Route path="cities" element={<CityView />} />
          <Route path="deliveryHours" element={<DeliveryHoursView />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
