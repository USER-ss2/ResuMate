const router = require("express").Router();
const { Certif } = require("../models/certif");
const  User  = require("../models/userModel");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      certificationName,
      organizationName,
      issueDate,
      expirationDate,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Créer un nouveau projet
    const certif = new Certif({
        userId,
        certificationName,
        organizationName,
        issueDate,
        expirationDate,
    });

    // Sauvegarder dans la base de données
    const savedCertif = await certif.save();
    res.status(201).json({ message: "Certif added successfully", savedCertif });
  } catch (error) {
    console.error("Error saving certif:", error);
    res.status(500).json({ message: "Failed to add certif", error });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
   
    const certifRecords = await Certif.find({ userId: userId });
    res.status(200).json({ certifRecords });
  } catch (error) {
    res.status(500).json({ message: "Error fetching certificatioons records" });
  }
});


module.exports = router;
