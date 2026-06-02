require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Customer Analytics API is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server health check passed",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed");
    process.exit(1);
  }
};

startServer();
