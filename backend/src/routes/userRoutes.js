const express = require("express");
const router = express.Router();
const { 
  getAllUsers, 
  createUser, 
  updateUser, 
  deleteUser 
} = require("../controllers/userController");
const { verifyJWT, isAdmin } = require("../middlewares/authMiddleware");

// All user management routes require Admin access
router.use(verifyJWT);
router.use(isAdmin);

router.route("/")
  .get(getAllUsers)
  .post(createUser);

router.route("/:id")
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
