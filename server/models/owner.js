import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
  name: String,
  password: String,
});
////shishaTi?
const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
