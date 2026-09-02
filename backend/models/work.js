const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional back-reference
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  position: { type: String, required: true },
  startDate: {
    month: { type: String, required: true },
    year: { type: String, required: true },
  },
  endDate: {
    month: { type: String },
    year: { type: String },
    present: { type: Boolean, default: false },
  },
  responsibilities: { type: String, required: true },

}, {
    collection: "Work" // Specify the exact collection name
  });

const Work = mongoose.model("Work", workSchema);

module.exports = { Work };