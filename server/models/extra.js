import mongoose from "mongoose";

const extraSchema = mongoose.Schema({
  name: String,
  price: Number,
});

const Extra = mongoose.model("Extra", extraSchema);

export default Extra;
