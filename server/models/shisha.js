import mongoose from "mongoose";

const shishaSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  deposit: Number,
  shishaExtras: Array,
  selectedFile: String,
  amount: Number,
  show: {
    type: Boolean,
    default: true,
  },
});

const Shisha = mongoose.model("Shisha", shishaSchema);

export default Shisha;
