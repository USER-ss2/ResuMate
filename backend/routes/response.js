const router = require("express").Router();
const { Response } = require("../models/response");
const  User  = require("../models/userModel");

router.post("/", async (req, res) => {
    try {
      const { userId, category, description } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      // Validate that all required fields are provided
      if (!userId || !category || !description) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Create a new response document
      const newResponse = new Response({
        userId,
        category,
        description,
      });
  
      // Save the response to the database
      const savedResponse = await newResponse.save();
  
      // Send a success response
      res.status(201).json({
        message: "Response submitted successfully",
        response: savedResponse,
      });
    } catch (error) {
      console.error("Error submitting response:", error);
      res.status(500).json({ error: "An error occurred while submitting the response" });
    }
});


router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
   
    const response = await Response.find({ userId: userId });
    res.status(200).json({ response});
  } catch (error) {
    res.status(500).json({ message: "Error fetching academic records" });
  }
});
module.exports = router;
