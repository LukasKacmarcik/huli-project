import mongoose from "mongoose";

const citySchema = mongoose.Schema({
  name: String,
  price: Number,
});

const City = mongoose.model("City", citySchema);

export default City;
