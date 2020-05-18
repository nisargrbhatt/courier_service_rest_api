const mongoose = require("mongoose");

const courierSchema = mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  item_weight: {
    type: Number,
    required: true,
  },
  pickup_location: {
    type: String,
    required: true,
  },
  drop_location: {
    type: String,
    required: true,
  },
  delivery_type: {
    type: Number,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  imagePath: {
    type: String,
    required: true,
  },
  order_assigner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  work_assigned: {
    type: String,
  },
  item_status: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Courier", courierSchema);
