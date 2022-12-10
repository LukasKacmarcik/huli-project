import mongoose from "mongoose";

const deliveryHourSchema = mongoose.Schema({
  hour: Number,
});

const DeliveryHour = mongoose.model("deliveryHour", deliveryHourSchema);

export default DeliveryHour;
