import City from "../models/cities.js";
import DeliveryHour from "../models/deliveryHour.js";
import Extra from "../models/extra.js";
import Order from "../models/order.js";
import Tobacco from "../models/tobacco.js";
import sendMail from "../mails/mailer.js";

//// Orders ////////////////////////////////////////////
export const getOrders = async (req, res) => {
  try {
    const response = await Order.find().sort({
      dateOfDelivery: -1,
    });
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

  let isValid = true;
  const messages = {
    orderDateError: "",
    ordeHourError: "",
    ordeTobaccoError: "",
    ordeUserFullNameError: "",
    ordeUserAddressError: "",
    ordeUserTelNumberError: "",
    ordeUserEmailAddressError: "",
  };

  if (!order.dateOfDelivery) {
    messages.orderDateError += "Je potrebné zvoliť dátum doručenia. \n";
    isValid = false;
  }

  if (order.timeOfDelivery == 0) {
    messages.ordeHourError += "Je potrebné zvoliť hodinu doručenia. \n";
    isValid = false;
  }

  if (!order.tobacco) {
    messages.ordeTobaccoError += "Je potrebné zvoliť tabák. \n";
    isValid = false;
  }

  if (!order.userFullName.trim()) {
    messages.ordeUserFullNameError +=
      "Je potrebné zadať svoje meno a priezvisko. \n";
    isValid = false;
  }

  if (!order.userAddress.trim()) {
    messages.ordeUserAddressError += "Je potrebné zadať adresu. \n";
    isValid = false;
  }

  if (!order.userTelNumber.trim()) {
    messages.ordeUserTelNumberError += "Je potrebné zadať telefónne číslo. \n";
    isValid = false;
  }

  if (!order.userEmailAddress.trim()) {
    messages.ordeUserEmailAddressError +=
      "Je potrebné zadať emailovú adresu. \n";
    isValid = false;
  }

  if (!isValid) {
    res.status(400).json(messages);
    return;
  }

  const newOrder = new Order(order);

  try {
    await newOrder.save();

    res.status(201).json(newOrder);
    await sendMail(order).catch(console.error);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    await Order.findOneAndUpdate({ _id: req.body._id }, [
      {
        $set: {
          ownerNote: req.body.ownerNote,
          userAddress: req.body.userAddress,
          userFullName: req.body.userFullName,
          userNote: req.body.userNote,
          userTelNumber: req.body.userTelNumber,
          userEmailAddress: req.body.userEmailAddress,
        },
      },
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
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

//// Extras ///////////////////////////////////////////
export const getExtras = async (req, res) => {
  try {
    const response = await Extra.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const postExtra = async (req, res) => {
  const extra = req.body;
  const newExtra = new Extra(extra);

  try {
    await newExtra.save();

    res.status(201).json(newExtra);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const deleteExtra = async (req, res) => {
  try {
    const response = await Extra.findOneAndRemove({ _id: req.params.extraId });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

//// Delivery Hours ///////////////////////////////////
export const getDeliveryHours = async (req, res) => {
  try {
    const response = await DeliveryHour.find().sort({
      hour: 1,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const postDeliveryHour = async (req, res) => {
  const deliveryHour = req.body;
  const newDeliveryHour = new DeliveryHour(deliveryHour);

  try {
    await newDeliveryHour.save();

    res.status(201).json(newDeliveryHour);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const deleteDeliveryHour = async (req, res) => {
  try {
    const response = await DeliveryHour.findOneAndRemove({
      _id: req.params.deliveryHourId,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
//// Tobaccos ///////////////////////////////////////////
export const getTobaccos = async (req, res) => {
  try {
    const response = await Tobacco.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const postTobacco = async (req, res) => {
  const tobacco = req.body;
  const newTobacco = new Tobacco(tobacco);

  try {
    await newTobacco.save();

    res.status(201).json(newTobacco);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const deleteTobacco = async (req, res) => {
  try {
    const response = await Tobacco.findOneAndRemove({
      _id: req.params.tobaccoId,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

//// Cities ///////////////////////////////////////////
export const getCities = async (req, res) => {
  try {
    const response = await City.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const postCity = async (req, res) => {
  const city = req.body;
  const newCity = new City(city);

  try {
    await newCity.save();

    res.status(201).json(newCity);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const response = await City.findOneAndRemove({
      _id: req.params.cityId,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
