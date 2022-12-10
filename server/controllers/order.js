import Order from "../models/order.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
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
