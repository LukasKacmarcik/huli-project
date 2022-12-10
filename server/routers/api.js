import express from "express";
import jwt from "jsonwebtoken";
import { getShishas, postShisha } from "../controllers/shisha.js";
import {
  getOrders,
  postOrder,
  getExtras,
  getDeliveryHours,
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
api.post("/shisha/new", postShisha);

////////ORDERS/////////
api.get("/orders", getOrders);
api.post("/order/new", postOrder);

////////Extras/////////
api.get("/extras", getExtras);

////////DeliveryHours/////////
api.get("/deliveryHours", getDeliveryHours);

// export the routes
export default api;
