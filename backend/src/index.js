require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { loggerMiddleware, requestTimeMiddleware } = require("./middlewares/loggerMiddleware");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(requestTimeMiddleware);

// Routes
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/auth", authRoutes);

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

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

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
