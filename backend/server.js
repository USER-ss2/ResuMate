require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db/connection.js");
const questionRoutes = require("./routes/questions");
const userRoutes = require("./routes/user");
const responseRoutes = require("./routes/response");
const academicRoutes = require("./routes/academic");
const workRoutes = require("./routes/work");
const projectRoutes = require("./routes/projects");
const certifRoutes = require("./routes/certif");
const exhibitionRoutes = require("./routes/exhibition");



// database connection
connection();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });
app.use(cors());

// routes
app.use("/api/question", questionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/response", responseRoutes);
app.use("/api/academic", academicRoutes);
app.use("/api/work", workRoutes);
app.use("/api/certification", certifRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/exhibition", exhibitionRoutes);

const port = 5050;
app.listen(port, console.log(`Listening on port ${port}...`));
console.log("SECRET:", process.env.SECRET);
