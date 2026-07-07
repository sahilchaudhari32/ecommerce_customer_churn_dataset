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
const validate = require("../middlewares/validationMiddleware");
const {
  loginSchema,
  registerSchema,
  updateProfileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validations/authValidation");

// Public Routes
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password/:token", validate(resetPasswordSchema), resetPassword);

// Protected Routes
router.post("/logout", verifyJWT, logoutUser);
router.get("/profile", verifyJWT, getCurrentUser);
router.patch("/profile", verifyJWT, validate(updateProfileSchema), updateProfile);
router.post("/change-password", verifyJWT, validate(changePasswordSchema), changePassword);
router.post("/send-otp", verifyJWT, sendOTP);
router.post("/verify-otp", verifyJWT, verifyOTP);

module.exports = router;
