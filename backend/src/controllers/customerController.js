const customerService = require("../services/customerService");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { getPaginationOptions, getPaginationMetadata } = require("../utils/pagination");
const buildCustomerFilter = require("../utils/filterBuilder");

const createCustomer = asyncHandler(async (req, res) => {
  const customer = await customerService.createCustomer(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, customer, "Customer created successfully"));
});

const getAllCustomers = asyncHandler(async (req, res) => {
  const { page, limit, skip, sort } = getPaginationOptions(req.query);
  const filter = buildCustomerFilter(req.query);

  const { customers, total } = await customerService.getAllCustomers({
    filter,
    sort,
    skip,
    limit,
  });

  // Map to format expected by both ChurnDatasetPage.jsx and Dashboard Overview.jsx
  const formattedRecords = customers.map(c => {
    const rawData = c._doc || c;
    const cid = rawData._id.toString();
    
    return {
      ...rawData,
      id: cid,
      customerID: cid.substring(cid.length - 10).toUpperCase(),
      name: `Customer ${cid.substring(cid.length - 4).toUpperCase()}`, // Derived name
      email: `customer_${cid.substring(cid.length - 6)}@example.com`, // Derived email
      gender: rawData.gender,
      seniorCitizen: rawData.age > 60 ? "Yes" : "No",
      partner: "Yes", // Mock
      dependents: "No", // Mock
      tenure: rawData.membershipYears,
      phoneService: "Yes", // Mock
      multipleLines: "No", // Mock
      internetService: "Fiber optic", // Mock
      contract: rawData.signupQuarter === "Q1" ? "Month-to-month" : "One year", // Mock derived
      contractType: rawData.signupQuarter === "Q1" ? "Month-to-Month" : "One Year", // Matches Dashboard
      monthlyCharges: rawData.averageOrderValue,
      totalCharges: rawData.lifetimeValue,
      churn: rawData.churned ? "Yes" : "No",
      churnLabel: rawData.churned ? "Churned" : "Active",
      date: new Date(rawData.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })
    };
  });

  return res.status(200).json({
    success: true,
    data: formattedRecords,
    total,
    page,
    totalPages: Math.ceil(total / (limit || 10)),
    limit,
  });
});

const exportCSVCustomers = asyncHandler(async (req, res) => {
  const filter = buildCustomerFilter(req.query);
  const { customers } = await customerService.getAllCustomers({
    filter,
    limit: 10000, // Export up to 10k records
  });

  const { Parser } = require("json2csv");
  const fields = [
    "gender", "age", "country", "city", "membershipYears", 
    "totalPurchases", "averageOrderValue", "lifetimeValue", 
    "churned", "signupQuarter"
  ];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(customers);

  res.header("Content-Type", "text/csv");
  res.attachment("customers_export.csv");
  return res.send(csv);
});

const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer found"));
});

const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await customerService.updateCustomer(req.params.id, req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer updated successfully"));
});

const deleteCustomer = asyncHandler(async (req, res) => {
  await customerService.deleteCustomer(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Customer deleted successfully"));
});

const checkCustomerExists = asyncHandler(async (req, res) => {
  const exists = await customerService.checkExists(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, { exists }, `Customer check complete`));
});

const bulkCreateCustomers = asyncHandler(async (req, res) => {
  const customers = await customerService.bulkCreate(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, customers, `${customers.length} customers imported successfully`));
});

const bulkUpdateCustomers = asyncHandler(async (req, res) => {
  const { ids, updateData } = req.body;
  const result = await customerService.bulkUpdate(ids, updateData);
  return res
    .status(200)
    .json(new ApiResponse(200, result, `Bulk update complete. Modified ${result.modifiedCount} records`));
});

const bulkDeleteCustomers = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  const result = await customerService.bulkDelete(ids);
  return res
    .status(200)
    .json(new ApiResponse(200, result, `Bulk deletion complete. Removed ${result.modifiedCount} records`));
});

// Specialized Segment Handlers
const getCustomersByField = asyncHandler(async (req, res) => {
  const { field, value } = req.params;
  const { page, limit, skip } = getPaginationOptions(req.query);
  
  const { customers, total } = await customerService.getAllCustomers({
    filter: { [field]: value },
    skip,
    limit,
  });

  const metadata = getPaginationMetadata(page, limit, total);
  return res
    .status(200)
    .json(new ApiResponse(200, { customers, pagination: metadata }, `Customers for ${field}: ${value} fetched`));
});

const getCustomersByStatus = asyncHandler(async (req, res) => {
  const { status } = req.params;
  const { page, limit, skip } = getPaginationOptions(req.query);
  
  const isChurned = status === 'churned';
  const { customers, total } = await customerService.getAllCustomers({
    filter: { churned: isChurned },
    skip,
    limit,
  });

  const metadata = getPaginationMetadata(page, limit, total);
  return res
    .status(200)
    .json(new ApiResponse(200, { customers, pagination: metadata }, `Customers with status ${status} fetched`));
});

const getCustomersBySegment = asyncHandler(async (req, res) => {
  const { segment } = req.params;
  const { page, limit, skip } = getPaginationOptions(req.query);
  
  let filter = {};
  switch (segment) {
    case 'high-value':
      filter = { lifetimeValue: { $gte: 5000 } };
      break;
    case 'loyal':
      filter = { membershipYears: { $gte: 3 } };
      break;
    case 'premium':
      filter = { lifetimeValue: { $gte: 7000 }, socialMediaEngagementScore: { $gte: 80 } };
      break;
    case 'risky':
      filter = { cartAbandonmentRate: { $gte: 50 }, loginFrequency: { $lt: 5 } };
      break;
    case 'high-purchases':
      filter = { totalPurchases: { $gt: 50 } };
      break;
    case 'high-credit':
      filter = { creditBalance: { $gt: 100 } };
      break;
    case 'high-engagement':
      filter = { socialMediaEngagementScore: { $gte: 70 } };
      break;
    case 'high-mobile-usage':
      filter = { mobileAppUsage: { $gt: 5 } };
      break;
    case 'high-discount-users':
      filter = { discountUsageRate: { $gt: 10 } };
      break;
    case 'recent-buyers':
      filter = { daysSinceLastPurchase: { $lte: 30 } };
      break;
    case 'inactive':
      filter = { churned: true, loginFrequency: { $lt: 5 } };
      break;
    case 'top-reviewers':
      filter = { productReviewsWritten: { $gte: 5 } };
      break;
    case 'high-cart-abandonment':
      filter = { cartAbandonmentRate: { $gte: 50 } };
      break;
    case 'frequent-logins':
      filter = { loginFrequency: { $gte: 20 } };
      break;
    default:
      throw new ApiError(400, "Invalid segment type");
  }

  const { customers, total } = await customerService.getAllCustomers({
    filter,
    skip,
    limit,
  });

  const metadata = getPaginationMetadata(page, limit, total);
  return res
    .status(200)
    .json(new ApiResponse(200, { customers, pagination: metadata }, `Segment: ${segment} fetched`));
});

const getCustomersByAnalytics = asyncHandler(async (req, res) => {
  const { field } = req.params;
  const { min, max } = req.query;
  const { page, limit, skip } = getPaginationOptions(req.query);

  const filter = {};
  const range = {};
  
  if (min !== undefined) range.$gte = Number(min);
  if (max !== undefined) range.$lte = Number(max);
  
  if (Object.keys(range).length > 0) {
    filter[field] = range;
  }

  const { customers, total } = await customerService.getAllCustomers({
    filter,
    skip,
    limit,
  });

  const metadata = getPaginationMetadata(page, limit, total);
  return res
    .status(200)
    .json(new ApiResponse(200, { customers, pagination: metadata }, `Analytics for ${field} fetched`));
});

const getSortedCustomers = asyncHandler(async (req, res) => {
  const { field, order } = req.params;
  const { page, limit, skip } = getPaginationOptions(req.query);

  const sortOrder = order === "asc" ? 1 : -1;
  const sort = { [field]: sortOrder };

  const { customers, total } = await customerService.getAllCustomers({
    filter: { isDeleted: false },
    skip,
    limit,
    sort,
  });

  const metadata = getPaginationMetadata(page, limit, total);
  return res
    .status(200)
    .json(new ApiResponse(200, { customers, pagination: metadata }, `Customers sorted by ${field} ${order} fetched`));
});

const searchCustomers = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const { page, limit, skip, sort } = getPaginationOptions(req.query);

  if (!q) {
    throw new ApiError(400, "Search query 'q' is required");
  }

  let filter = { isDeleted: false };
  const searchRegex = new RegExp(q, "i");

  // Keyword Mapping logic
  const keyword = q.toLowerCase().trim();
  const searchConditions = [
    { country: searchRegex },
    { city: searchRegex },
    { gender: searchRegex },
  ];

  if (keyword === "loyal") searchConditions.push({ membershipYears: { $gte: 3 } });
  if (keyword === "churned") searchConditions.push({ churned: true });
  if (keyword === "active") searchConditions.push({ churned: false });
  if (keyword === "premium") searchConditions.push({ lifetimeValue: { $gte: 7000 } });
  if (keyword === "high-value") searchConditions.push({ lifetimeValue: { $gte: 5000 } });

  filter.$or = searchConditions;

  const { customers, total } = await customerService.getAllCustomers({
    filter,
    skip,
    limit,
    sort,
  });

  const metadata = getPaginationMetadata(page, limit, total);
  return res
    .status(200)
    .json(new ApiResponse(200, { customers, pagination: metadata }, `Search results for: ${q} fetched`));
});

const getFilteredCustomers = asyncHandler(async (req, res) => {
  const { filterType } = req.params;
  const { page, limit, skip, sort } = getPaginationOptions(req.query);
  
  let filter = { isDeleted: false };
  switch (filterType) {
    case 'high-session':
      filter.sessionDurationAvg = { $gt: 60 };
      break;
    case 'low-session':
      filter.sessionDurationAvg = { $lt: 10 };
      break;
    case 'high-order-value':
      filter.averageOrderValue = { $gt: 200 };
      break;
    case 'high-purchases':
      filter.totalPurchases = { $gt: 50 };
      break;
    case 'high-credit':
      filter.creditBalance = { $gt: 100 };
      break;
    case 'loyal':
      filter.membershipYears = { $gte: 3 };
      break;
    case 'active':
      filter.churned = false;
      break;
    case 'engaged':
    case 'high-engagement':
      filter.socialMediaEngagementScore = { $gte: 70 };
      break;
    case 'high-mobile-usage':
      filter.mobileAppUsage = { $gt: 5 };
      break;
    case 'high-discount-users':
      filter.discountUsageRate = { $gt: 10 };
      break;
    case 'inactive':
      filter.churned = true;
      filter.loginFrequency = { $lt: 5 };
      break;
    case 'top-reviewers':
      filter.productReviewsWritten = { $gte: 5 };
      break;
    case 'high-cart-abandonment':
      filter.cartAbandonmentRate = { $gte: 50 };
      break;
    case 'frequent-logins':
      filter.loginFrequency = { $gte: 20 };
      break;
    default:
      throw new ApiError(400, "Invalid filter type");
  }

  const { customers, total } = await customerService.getAllCustomers({
    filter,
    skip,
    limit,
    sort,
  });

  const metadata = getPaginationMetadata(page, limit, total);
  return res
    .status(200)
    .json(new ApiResponse(200, { customers, pagination: metadata }, `Filter: ${filterType} fetched`));
});

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  checkCustomerExists,
  bulkCreateCustomers,
  bulkUpdateCustomers,
  bulkDeleteCustomers,
  getCustomersByField,
  getCustomersByStatus,
  getCustomersBySegment,
  getCustomersByAnalytics,
  getSortedCustomers,
  searchCustomers,
  getFilteredCustomers,
  exportCSVCustomers,
};
