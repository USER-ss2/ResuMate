const mongoose = require("mongoose");

const exhibitionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional back-reference
    exhibitionName: { type: String, required: true },
    exhibitionLocation: { type: String, required: true },
    exhibitionTheme: { type: String, required: true },
    startDate: {
      startMonthExhibition: { type: String, required: true },
      startYearExhibition: { type: Number, required: true },
    },
    endDate: {
      endMonthExhibition: { type: String },
      endYearExhibition: { type: Number },
    },
    exhibitionDescription: { type: String, required: true },
  },
  {
    collection: "Exhibition", // Specify the exact collection name
  }
);

const Exhibition = mongoose.model("Exhibition", exhibitionSchema);

module.exports = { Exhibition };
