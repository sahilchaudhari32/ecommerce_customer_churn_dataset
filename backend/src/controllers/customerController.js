const customerService = require("../services/customerService");
const asyncHandler = require("../utils/asyncHandler");
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
  const { page, limit, skip } = getPaginationOptions(req.query);
  
  const filter = buildCustomerFilter(req.query);

  const { customers, total } = await customerService.getAllCustomers({
    filter,
    skip,
    limit,
  });

  const metadata = getPaginationMetadata(page, limit, total);
  
  return res
    .status(200)
    .json(new ApiResponse(200, { customers, pagination: metadata }, "Customers fetched successfully"));
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
};
