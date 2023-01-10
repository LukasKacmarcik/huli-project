import mongoose from "mongoose";

const tobaccoSchema = mongoose.Schema({
  type: String,
  name: String,
  price: Number,
});

const Tobacco = mongoose.model("Tobacco", tobaccoSchema);

export default Tobacco;
