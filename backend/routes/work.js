const router = require("express").Router();
const { Work } = require("../models/work");
const User  = require("../models/userModel");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      companyName,
      location,
      position,
      startDate,
      endDate,
      responsibilities,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Créer un nouveau projet
    const work = new Work({
        userId,
        companyName,
        location,
        position,
        startDate,
        endDate,
        responsibilities,
    });

    // Sauvegarder dans la base de données
    const savedWork = await work.save();
    res
      .status(201)
      .json({ message: "Work added successfully", savedWork });
  } catch (error) {
    console.error("Error saving work:", error);
    res.status(500).json({ message: "Failed to add work", error });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const workRecords = await Work.find({ userId: userId });
    res.status(200).json({ workRecords });
  } catch (error) {
    res.status(500).json({ message: "Error fetching work records" });
  }
});
module.exports = router;
