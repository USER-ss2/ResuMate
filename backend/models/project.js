
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional back-reference
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  technologiesUsed: { type: [String], required: true },
  startDate: {
    startMonthProject: { type: String, required: true },
    startYearProject: { type: Number, required: true },
  },
  endDate: {
    endMonthProject: { type: String },
    endYearProject: { type: Number },
    ongoing: { type: Boolean, default: false },
  },
}, {
    collection: "Projects" // Specify the exact collection name
  });

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };
