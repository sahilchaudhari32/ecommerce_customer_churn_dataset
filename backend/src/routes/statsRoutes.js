const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const { verifyJWT } = require("../middlewares/authMiddleware");

// All stats require authentication
router.use(verifyJWT);

// Stats & Analytics Routes
router.get("/overview", statsController.getOverview);
router.get("/distribution/:field", statsController.getFieldDistribution);
router.get("/top-performers", statsController.getTopPerformers);
router.get("/churn-analysis", statsController.getChurnIntelligence);
router.get("/risk-prediction", statsController.getRiskAnalysis);
router.get("/dashboard-summary", statsController.getDashboardData);
router.get("/random", statsController.getRandomProfile);

module.exports = router;
