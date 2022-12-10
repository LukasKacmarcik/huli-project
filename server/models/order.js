import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userFullName: String,
  userAddress: String,
  dateOfDelivery: Date,
  timeOfDelivery: String,
  userTelNumber: String,
  extras: [String],
  total: Number,
  userNote: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  done: {
    type: Boolean,
    default: false,
  },
  ownerNote: {
    type: String,
    default: "",
  },
});

const Order = mongoose.model("Order", shishaSchema);

export default Order;
