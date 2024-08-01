const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity:{
        type: Number,
        default:1,
        required: false,
    },
    userId: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartProduct", CartProductSchema);
