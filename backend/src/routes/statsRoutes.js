const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const { verifyJWT } = require("../middlewares/authMiddleware");

// All stats require authentication
router.use(verifyJWT);

// Stats & Analytics Routes
router.get("/overview", statsController.getOverview);
router.get("/monthly-churn", statsController.getChurnTrend);
router.get("/churn-trend", statsController.getChurnTrend);
router.get("/churn-by-category", statsController.getChurnByCategory);
router.get("/churn-by-contract", statsController.getChurnByContract);
router.get("/churn-by-internet", statsController.getChurnByInternet);
router.get("/churn-by-payment", statsController.getChurnByPayment);
router.get("/churn-by-gender", statsController.getChurnByGender);
router.get("/charges-distribution", statsController.getChargesDistribution);
router.get("/top-stats", statsController.getTopStats);
router.get("/insights", statsController.getInsights);
router.get("/distribution/:field", statsController.getFieldDistribution);
router.get("/top-performers", statsController.getTopPerformers);
router.get("/churn-analysis", statsController.getChurnIntelligence);
router.get("/risk-prediction", statsController.getRiskAnalysis);
router.get("/dashboard-summary", statsController.getDashboardData);
router.get("/random", statsController.getRandomProfile);

module.exports = router;
