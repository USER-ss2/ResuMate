const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  field: { type: String, required: true },
  category: { type: String, required: true },
  questionText: { type: String, required: true },
  inputType: { type: String, required: true },
  options: { type: [String], default: [] },
  isRequired: { type: Boolean, required: true }
  
  }, {
    collection: "Question" // Specify the exact collection name
  });
const Question = mongoose.model("Question", questionSchema);
module.exports = { Question };