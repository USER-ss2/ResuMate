const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/ResuMate";

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose
      .connect(uri)
      .then(() => {
        console.log(`Connected to database: ${mongoose.connection.name}`);
      })
      .catch((err) => {
        console.error("Error connecting to the database:", err);
      });
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};
