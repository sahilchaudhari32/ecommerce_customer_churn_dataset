require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const { loggerMiddleware, requestTimeMiddleware } = require("./middlewares/loggerMiddleware");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const app = express();

// Security Middlewares
app.use(helmet());
app.use(xss());
app.use(hpp());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

const PORT = Number(process.env.PORT) || 5000;

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(requestTimeMiddleware);

// Routes
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
const statsRoutes = require("./routes/statsRoutes");

app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/analytics", statsRoutes);

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
