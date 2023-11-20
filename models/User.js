const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    address : {
      
      city : {
        type : String,
      },

      country : {
        type : String,
      },

      state : {
        type : String
      }
      
    },

    profession : {
          type : String,
    },

    education : {
      type : String
    },

    bio : {
        type : String
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
