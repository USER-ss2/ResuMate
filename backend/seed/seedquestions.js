const mongoose = require("mongoose");
const { Question } = require("../models/Question");

const uri =
  process.env.ATLAS_URI || "mongodb://localhost:27017/ResuMate";

const questionsData = [
  // =========================================================
  // 1. PERSONAL STATEMENT
  // =========================================================
  {
    field: "IT",
    category: "personal statement",
    questionText: "Tell us about yourself and your professional profile.",
    inputType: "textarea",
    options: [],
    isRequired: true,
  },

  // =========================================================
  // 2. PROFESSIONAL
  // =========================================================
  {
    field: "IT",
    category: "professional",
    questionText: "Which professional roles best describe your profile?",
    inputType: "checkbox",
    options: [
      "Software Engineer",
      "Web Developer",
      "Web Designer",
      "UI/UX Designer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Mobile Developer",
      "DevOps Engineer",
      "Data Analyst",
      "Project Manager",
      "Other",
    ],
    isRequired: true,
  },

  // =========================================================
  // 3. SKILLS
  // =========================================================
  {
    field: "IT",
    category: "skills",
    questionText: "Which technical skills do you have?",
    inputType: "checkbox",
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "SQL",
      "Java",
      "Python",
      "C",
      "C++",
      "Git",
      "GitHub",
      "Docker",
      "REST API",
      "JWT",
      "Bootstrap",
      "Tailwind CSS",
      "Figma",
      "Power BI",
      "SSIS",
      "Microsoft SQL Server",
      "Other",
    ],
    isRequired: true,
  },

  // =========================================================
  // 4. LANGUAGES
  // =========================================================
  {
    field: "IT",
    category: "languages",
    questionText: "Which languages do you speak?",
    inputType: "checkbox",
    options: [
      "Arabic",
      "French",
      "English",
      "German",
      "Spanish",
      "Italian",
      "Other",
    ],
    isRequired: true,
  },

  // =========================================================
  // 5. HOBBIES
  // =========================================================
  {
    field: "IT",
    category: "hobbies",
    questionText: "What are your hobbies and interests?",
    inputType: "checkbox",
    options: [
      "Reading",
      "Travel",
      "Photography",
      "Drawing",
      "Design",
      "Music",
      "Sport",
      "Technology",
      "Programming",
      "Gaming",
      "Volunteering",
      "Entrepreneurship",
      "Art",
      "Writing",
      "Other",
    ],
    isRequired: false,
  },

  // =========================================================
  // 6. ACADEMIC
  // =========================================================
  {
    field: "IT",
    category: "academic",
    questionText: "Add your academic background.",
    inputType: "form",
    options: [],
    isRequired: true,
  },

  // =========================================================
  // 7. COURSES
  // =========================================================
  {
    field: "IT",
    category: "courses",
    questionText: "Add courses or academic subjects you have completed.",
    inputType: "form",
    options: [],
    isRequired: false,
  },

  // =========================================================
  // 8. WORK EXPERIENCE
  // =========================================================
  {
    field: "IT",
    category: "workExperience",
    questionText: "Add your professional experience.",
    inputType: "form",
    options: [],
    isRequired: false,
  },

  // =========================================================
  // 9. CERTIFICATIONS
  // =========================================================
  {
    field: "IT",
    category: "certifications",
    questionText: "Add your professional certifications.",
    inputType: "form",
    options: [],
    isRequired: false,
  },

  // =========================================================
  // 10. PROJECTS
  // =========================================================
  {
    field: "IT",
    category: "projects",
    questionText: "Add a project to your portfolio.",
    inputType: "form",
    options: [],
    isRequired: false,
  },

  // =========================================================
  // 11. EXHIBITIONS
  // =========================================================
  {
    field: "Arts",
    category: "exhibitions",
    questionText: "Add an exhibition or artistic activity.",
    inputType: "form",
    options: [],
    isRequired: false,
  },
];

async function seedDatabase() {
  try {
    // ---------------------------------------------------------
    // Connexion MongoDB
    // ---------------------------------------------------------
    await mongoose.connect(uri);

    console.log(
      `✅ Connecté à la base : ${mongoose.connection.name}`
    );

    console.log("📦 Modèle Question chargé avec succès");

    // ---------------------------------------------------------
    // Suppression des anciennes questions
    // ---------------------------------------------------------
    const deleteResult = await Question.deleteMany({});

    console.log(
      `🗑️ ${deleteResult.deletedCount} anciennes questions supprimées`
    );

    // ---------------------------------------------------------
    // Insertion des nouvelles questions
    // ---------------------------------------------------------
    const inserted = await Question.insertMany(questionsData);

    console.log(
      `✅ ${inserted.length} questions insérées avec succès !`
    );

    // ---------------------------------------------------------
    // Aperçu
    // ---------------------------------------------------------
    console.log("\n📝 Questions insérées :");

    inserted.forEach((q, index) => {
      console.log(
        `  ${index + 1}. [${q.category}] ${q.questionText}`
      );
    });

    // ---------------------------------------------------------
    // Déconnexion
    // ---------------------------------------------------------
    await mongoose.disconnect();

    console.log("\n🔌 Connexion MongoDB fermée");

    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);

    if (error.stack) {
      console.error("📋 Stack trace :", error.stack);
    }

    try {
      await mongoose.disconnect();
    } catch (disconnectError) {
      console.error(
        "⚠️ Erreur lors de la déconnexion :",
        disconnectError
      );
    }

    process.exit(1);
  }
}

seedDatabase();