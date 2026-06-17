const statsService = require("../services/statsService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getOverview = asyncHandler(async (req, res) => {
  const stats = await statsService.getOverviewStats();
  return res.status(200).json({ success: true, ...stats });
});

const getChurnTrend = asyncHandler(async (req, res) => {
  const trend = await statsService.getMonthlyTrend();
  return res.status(200).json(trend);
});

const getChurnByCategory = asyncHandler(async (req, res) => {
  const data = await statsService.getChurnByCategory();
  return res.status(200).json(data);
});

const getChurnByContract = asyncHandler(async (req, res) => {
  const data = await statsService.getChurnByContract();
  return res.status(200).json(data);
});

const getChurnByInternet = asyncHandler(async (req, res) => {
  const data = await statsService.getChurnByInternet();
  return res.status(200).json(data);
});

const getChurnByPayment = asyncHandler(async (req, res) => {
  const data = await statsService.getChurnByPayment();
  return res.status(200).json(data);
});

const getChurnByGender = asyncHandler(async (req, res) => {
  const data = await statsService.getChurnByGender();
  return res.status(200).json(data);
});

const getChargesDistribution = asyncHandler(async (req, res) => {
  const data = await statsService.getChargesDistribution();
  return res.status(200).json(data);
});

const getTopStats = asyncHandler(async (req, res) => {
  const data = await statsService.getTopStats();
  return res.status(200).json(data);
});

const getInsights = asyncHandler(async (req, res) => {
  const data = await statsService.getInsights();
  return res.status(200).json(data);
});

const getFieldDistribution = asyncHandler(async (req, res) => {
  const { field } = req.params;
  const distribution = await statsService.getDistribution(field);
  return res.status(200).json(new ApiResponse(200, distribution, `${field} distribution fetched`));
});

const getTopPerformers = asyncHandler(async (req, res) => {
  const { metric } = req.query;
  const customers = await statsService.getTopCustomers(10, metric || "lifetimeValue");
  return res.status(200).json(new ApiResponse(200, customers, `Top customers by ${metric || "lifetimeValue"} fetched`));
});

const getChurnIntelligence = asyncHandler(async (req, res) => {
  const churnData = await statsService.getChurnAnalysis();
  return res.status(200).json(new ApiResponse(200, churnData, "Churn intelligence report generated"));
});

const getRiskAnalysis = asyncHandler(async (req, res) => {
  const risky = await statsService.getAtRiskCustomers();
  return res.status(200).json(new ApiResponse(200, risky, "Predictive churn risk analysis complete"));
});

const getDashboardData = asyncHandler(async (req, res) => {
  const dashboard = await statsService.getDashboardSummary();
  return res.status(200).json(new ApiResponse(200, dashboard, "Executive dashboard summary fetched"));
});

const getRandomProfile = asyncHandler(async (req, res) => {
  const customer = await statsService.getRandomCustomer();
  return res.status(200).json(new ApiResponse(200, customer, "Random customer profile selected"));
});

module.exports = {
  getOverview,
  getChurnTrend,
  getChurnByCategory,
  getChurnByContract,
  getChurnByInternet,
  getChurnByPayment,
  getChurnByGender,
  getChargesDistribution,
  getTopStats,
  getInsights,
  getFieldDistribution,
  getTopPerformers,
  getChurnIntelligence,
  getRiskAnalysis,
  getDashboardData,
  getRandomProfile,
};
