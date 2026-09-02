const router = require("express").Router();
const { Exhibition } = require("../models/exhibition");
const  User  = require("../models/userModel");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      exhibitionName,
      exhibitionLocation,
      exhibitionTheme,
      startDate,
      endDate,
      exhibitionDescription,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Créer un nouveau projet
    const exhibition = new Exhibition({
      userId,
      exhibitionName,
      exhibitionLocation,
      exhibitionTheme,
      startDate,
      endDate,
      exhibitionDescription,
    });

    // Sauvegarder dans la base de données
    const savedExhibition = await exhibition.save();
    res
      .status(201)
      .json({ message: "Exhibition added successfully", savedExhibition });
  } catch (error) {
    console.error("Error saving exhibition:", error);
    res.status(500).json({ message: "Failed to add exhibition", error });
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
   
    const exhibitionRecords = await Exhibition.find({ userId: userId });
    res.status(200).json({ exhibitionRecords });
  } catch (error) {
    res.status(500).json({ message: "Error fetching exhibition records" });
  }
});


module.exports = router;
