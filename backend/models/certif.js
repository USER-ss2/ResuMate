
const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional back-reference
  certificationName: { type: String, required: true },
  organizationName: { type: String, required: true },
  issueDate: {
    issueMonth: { type: String, required: true },
    issueYear: { type: Number, required: true },
  },
  expirationDate: {
    expirationMonth: { type: String },
    expirationYear: { type: Number },
    expiring: { type: Boolean, default: false },
  },
}, {
    collection: "Certification" // Specify the exact collection name
  });

const  Certif = mongoose.model("Certification", certificationSchema);

module.exports = { Certif };
