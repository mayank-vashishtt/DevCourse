const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const connectDB = require("./config/db");

// Connect to MongoDB
connectDB().catch((err) => console.error("Failed to connect to MongoDB:", err));

// Wrap async route handlers to catch errors

const app = express();

// Basic middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Test route - placing it before other middleware

const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const holidayRoutes = require("./routes/holidayRoutes");

// API Routes
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/holidays", holidayRoutes);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
