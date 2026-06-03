const express = require("express");
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getCurrentUser, 
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  sendOTP,
  verifyOTP
} = require("../controllers/authController");
const { verifyJWT } = require("../middlewares/authMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected Routes
router.post("/logout", verifyJWT, logoutUser);
router.get("/profile", verifyJWT, getCurrentUser);
router.patch("/profile", verifyJWT, updateProfile);
router.post("/change-password", verifyJWT, changePassword);
router.post("/send-otp", verifyJWT, sendOTP);
router.post("/verify-otp", verifyJWT, verifyOTP);

module.exports = router;
