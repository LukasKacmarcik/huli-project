import express from "express";
import jwt from "jsonwebtoken";
import {
  getShishas,
  postShisha,
  getShishaExcludedDates,
  updateShisha,
  deleteShisha,
} from "../controllers/shisha.js";
import {
  getOrders,
  getOpenOrders,
  postOrder,
  updateOrder,
  switchOrderDoneStatus,
  getExtras,
  postExtra,
  deleteExtra,
  getDeliveryHours,
  postDeliveryHour,
  deleteDeliveryHour,
} from "../controllers/order.js";

const api = express.Router();
api.use(express.json());

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Bro we need token" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "U failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

const validateOptionalJWT = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token !== "null") {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ message: "U failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    req.userId = null;
    next();
  }
};

////////SHISHAS/////////
api.get("/shishas", getShishas);
api.get("/shisha/excludedDates/:selectedShishaName", getShishaExcludedDates);
api.post("/shisha/new", postShisha);
api.patch("/shisha/update", updateShisha);
api.delete("/shisha/delete/:shishaId", deleteShisha);

////////ORDERS/////////
api.get("/orders", getOrders);
api.get("/orders/open", getOpenOrders);
api.post("/order/new", postOrder);
api.patch("/order/update", updateOrder);
api.patch("/order/done", switchOrderDoneStatus);

////////Extras/////////
api.get("/extras", getExtras);
api.post("/extra/new", postExtra);
api.delete("/extra/delete/:extraId", deleteExtra);

////////DeliveryHours/////////
api.get("/deliveryHours", getDeliveryHours);
api.post("/deliveryHour/new", postDeliveryHour);
api.delete("/deliveryHour/delete/:deliveryHourId", deleteDeliveryHour);

// export the routes
export default api;
