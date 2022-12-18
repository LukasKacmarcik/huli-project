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

export const getOpenOrders = async (req, res) => {
  try {
    const response = await Order.find({ done: false }).sort({
      dateOfDelivery: 1,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const postOrder = async (req, res) => {
  const order = req.body;

  const newOrder = new Order(order);

  try {
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const switchOrderDoneStatus = async (req, res) => {
  try {
    //// Find original order by id
    const originalOrder = await Order.findOne({ _id: req.body._id });

    //// Switch order done status base on original value
    await Order.findOneAndUpdate({ _id: req.body._id }, [
      { $set: { done: !originalOrder.done } },
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
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
