import DeliveryHour from "../models/deliveryHour.js";
import Extra from "../models/extra.js";
import Order from "../models/order.js";

export const getOrders = async (req, res) => {
  try {
    const response = await Order.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const postOrder = async (req, res) => {
  const order = req.body;
  console.log(order);

  const newOrder = new Order(order);

  try {
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const getExtras = async (req, res) => {
  try {
    const response = await Extra.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const getDeliveryHours = async (req, res) => {
  try {
    const response = await DeliveryHour.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
