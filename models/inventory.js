const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
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

module.exports = mongoose.model("Inventory", inventorySchema);
