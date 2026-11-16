
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const projectRoutes = require("./routes/projects");

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Proton LabHub API is running");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "Proton LabHub backend is healthy"
    });
});

app.use("/api/projects", projectRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "An unexpected server error occurred." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
