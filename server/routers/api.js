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
  getTobaccos,
  postTobacco,
  deleteTobacco,
  getCities,
  postCity,
  deleteCity,
} from "../controllers/order.js";

import { postLogin, getCurrentUser } from "../controllers/authentication.js";

const api = express.Router();
api.use(express.json());

const verifyJWT = (req, res, next) => {
  if (!req.headers.authorization) {
    res
      .status(401)
      .json({ message: "U failed to authenticate (authorization is missing)" });
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Bro we need token" });
    return;
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "U failed to authenticate" });
        return;
      } else {
        req.userId = decoded._id;
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
        req.userId = decoded._id;
        next();
      }
    });
  } else {
    req.userId = null;
    next();
  }
};

////////AUTHENTICATION/////////
api.get("/user", validateOptionalJWT, getCurrentUser);
api.post("/login", postLogin);

////////SHISHAS/////////
api.get("/shishas", getShishas);
api.get("/shisha/excludedDates/:selectedShishaName", getShishaExcludedDates);
api.post("/shisha/new", verifyJWT, postShisha);
api.patch("/shisha/update", verifyJWT, updateShisha);
api.delete("/shisha/delete/:shishaId", verifyJWT, deleteShisha);

////////ORDERS/////////
api.get("/orders", getOrders);
api.get("/orders/open", verifyJWT, getOpenOrders);
api.post("/order/new", postOrder);
api.patch("/order/update", verifyJWT, updateOrder);
api.patch("/order/done", verifyJWT, switchOrderDoneStatus);

////////Extras/////////
api.get("/extras", getExtras);
api.post("/extra/new", verifyJWT, postExtra);
api.delete("/extra/delete/:extraId", verifyJWT, deleteExtra);

////////DeliveryHours/////////
api.get("/deliveryHours", getDeliveryHours);
api.post("/deliveryHour/new", verifyJWT, postDeliveryHour);
api.delete(
  "/deliveryHour/delete/:deliveryHourId",
  verifyJWT,
  deleteDeliveryHour
);

////////Tobaccos/////////
api.get("/tobaccos", getTobaccos);
api.post("/tobacco/new", verifyJWT, postTobacco);
api.delete("/tobacco/delete/:tobaccoId", verifyJWT, deleteTobacco);

////////Cities/////////
api.get("/cities", getCities);
api.post("/city/new", verifyJWT, postCity);
api.delete("/city/delete/:cityId", verifyJWT, deleteCity);
// export the routes
export default api;
