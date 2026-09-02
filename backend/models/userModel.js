const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  birthDate,
  email,
  password,
  address,
  field
) {
  // Validate input
  if (
    !firstName ||
    !lastName ||
    !birthDate ||
    !email ||
    !password ||
    !address ||
    !field
  ) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email format");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must include at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 special character"
    );
  }

  // Check if email exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email is already in use");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create user
  const user = await this.create({
    firstName,
    lastName,
    birthDate,
    email,
    password: hash,
    address,
    field
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // Find user
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  // Check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema, "User");
