import Shisha from "../models/shisha";

export const getShishas = async (req, res) => {
  try {
    const shishas = await Shisha.find();
    console.log(shishas);
    res.status(200).json(shishas);
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
