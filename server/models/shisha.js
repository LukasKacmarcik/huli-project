import mongoose from "mongoose";

const shishaSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  selectedFile: String,
  note: {
    type: String,
    default: "",
  },
});

const Shisha = mongoose.model("Shisha", shishaSchema);

export default Shisha;
