const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    userType: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
