const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      unique : true
    },
    Quantity: Number,
    Price: Number,
    Supplier: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vendor Inventory", vendorSchema);
