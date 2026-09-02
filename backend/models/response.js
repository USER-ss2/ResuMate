const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Response", // Specify the exact collection name
  }
);

const Response = mongoose.model("Response", responseSchema);

module.exports = { Response };
