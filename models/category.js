const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true },
    url: { type: String },
  });

// Export model
module.exports = mongoose.model("Category", CategorySchema);