const router = require("express").Router();
const { Academic } = require("../models/academic");
const  User  = require("../models/userModel");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      institutionName,
      location,
      fieldOfStudy,
      startDate,
      endDate,
      degreeType,
      receiptDate,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Créer un nouveau projet
    const project = new Academic({
      userId,
      institutionName,
      location,
      fieldOfStudy,
      startDate,
      endDate,
      degreeType,
      receiptDate,
    });

    // Sauvegarder dans la base de données
    const savedProject = await project.save();
    res
      .status(201)
      .json({ message: "Project added successfully", savedProject });
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ message: "Failed to add project", error });
  }
});

router.get("/:userId", async (req, res) => {
  try {
      const { userId } = req.params;
      const academicRecords = await Academic.find({ userId : userId });
      res.status(200).json({ academicRecords });
  } catch (error) {
      console.error("Error fetching academic records:", error);
      res.status(500).json({ message: "Error fetching academic records" });
  }
});


module.exports = router;
