const router = require("express").Router();
const { Question } = require("../models/question");
const User = require("../models/userModel"); // Assuming you have a User model
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from the request body
    console.log(userId);
    // Fetch the user from the database to get their field
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userField = user.field; // Assuming the field is stored in the User document

    // Fetch questions where the field is either 'General' or matches the user's field
    const questions = await Question.find({
      $or: [{ field: "General" }, { field: userField }],
    });

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching questions" });
  }
});
module.exports = router;
