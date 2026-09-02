const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional back-reference
    institutionName: { type: String, required: true },
    location: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    startDate: {
      month: { type: String, required: true },
      year: { type: String, required: true },
    },
    endDate: {
      month: { type: String },
      year: { type: String },
      present: { type: Boolean, default: false },
    },
    degreeType: { type: String, required: true },
    receiptDate: {
      month: { type: String, required: true },
      year: { type: String, required: true },
    },
  },
  {
    collection: "Academic", // Specify the exact collection name
  }
);

const Academic = mongoose.model("Academic", academicSchema);

module.exports = { Academic };
