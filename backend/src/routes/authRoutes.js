const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser, updateProfile } = require("../controllers/authController");
const { verifyJWT } = require("../middlewares/authMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.post("/logout", verifyJWT, logoutUser);
router.get("/profile", verifyJWT, getCurrentUser);
router.patch("/profile", verifyJWT, updateProfile);

module.exports = router;
