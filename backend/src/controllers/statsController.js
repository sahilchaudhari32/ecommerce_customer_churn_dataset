const statsService = require("../services/statsService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getOverview = asyncHandler(async (req, res) => {
  const stats = await statsService.getOverviewStats();
  return res.status(200).json(new ApiResponse(200, stats, "Overview statistics fetched"));
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
  getFieldDistribution,
  getTopPerformers,
  getChurnIntelligence,
  getRiskAnalysis,
  getDashboardData,
  getRandomProfile,
};
