const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: String, required: true },
    number_in_stock: {type: Number, min: 0, required: true },
    url: { type: String },
  });

// Export model
module.exports = mongoose.model("Item", ItemSchema);