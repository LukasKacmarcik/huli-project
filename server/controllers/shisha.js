import Order from "../models/order.js";
import Shisha from "../models/shisha.js";

export const getShishas = async (req, res) => {
  try {
    const shishas = await Shisha.find();
    res.status(200).json(shishas);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const getShishaExcludedDates = async (req, res) => {
  try {
    const excludedDates = await Order.find(
      {
        shishaName: req.params.selectedShishaName,
        dateOfDelivery: { $gt: new Date().toISOString() },
      },
      { dateOfDelivery: 1 }
    );
    res.status(200).json(excludedDates);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const postShisha = async (req, res) => {
  const shisha = req.body;

  const newShisha = new Shisha(shisha);

  try {
    await newShisha.save();

    res.status(201).json(newShisha);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const updateShisha = async (req, res) => {
  try {
    await Shisha.findOneAndUpdate({ _id: req.body._id }, [
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          show: req.body.show,
          selectedFile: req.body.selectedFile,
          amount: req.body.amount,
          shishaExtras: req.body.shishaExtras,
        },
      },
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const deleteShisha = async (req, res) => {
  try {
    const response = await Shisha.findOneAndRemove({
      _id: req.params.shishaId,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
