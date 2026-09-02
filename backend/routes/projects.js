const router = require("express").Router();
const { Project } = require("../models/project");
const  User  = require("../models/userModel");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      projectName,
      projectDescription,
      technologiesUsed,
      startDate,
      endDate,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Créer un nouveau projet
    const project = new Project({
        userId,
        projectName,
        projectDescription,
        technologiesUsed,
        startDate,
        endDate,
    });

    // Sauvegarder dans la base de données
    const savedProject = await project.save();
    res.status(201).json({ message: "Project added successfully", savedProject });
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ message: "Failed to add project", error });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
   
    const projectRecords = await Project.find({ userId: userId });
    console.log("projects ",projectRecords )
    res.status(200).json({ projectRecords });
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects records" });
  }
});
module.exports = router;
