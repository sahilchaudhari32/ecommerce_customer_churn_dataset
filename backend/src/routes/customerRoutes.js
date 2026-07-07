const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validate = require("../middlewares/validationMiddleware");
const { verifyJWT, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCustomerSchema,
  createCustomerBatchSchema,
  updateCustomerSchema,
  customerQuerySchema,
} = require("../validations/customerValidation");

// Protect all routes - User must be logged in
router.use(verifyJWT);

router.post("/bulk-create", isAdmin, validate(createCustomerBatchSchema), customerController.bulkCreateCustomers);
router.patch("/bulk-update", isAdmin, customerController.bulkUpdateCustomers);
router.delete("/bulk-delete", isAdmin, customerController.bulkDeleteCustomers);
router.get("/export/csv", customerController.exportCSVCustomers);
router.get("/high-purchases", (req, res, next) => { req.params.filterType = "high-purchases"; next(); }, customerController.getFilteredCustomers);
router.get("/high-credit", (req, res, next) => { req.params.filterType = "high-credit"; next(); }, customerController.getFilteredCustomers);
router.get("/high-discount-users", (req, res, next) => { req.params.filterType = "high-discount-users"; next(); }, customerController.getFilteredCustomers);
router.get("/search", customerController.searchCustomers);

// Specialized Information Routes
router.get("/status/:status", customerController.getCustomersByStatus);
router.get("/segment/:segment", customerController.getCustomersBySegment);
router.get("/field/:field/:value", customerController.getCustomersByField);
router.get("/analytics/:field", customerController.getCustomersByAnalytics);
router.get("/sort/:field/:order", customerController.getSortedCustomers);
router.get("/country/:value", (req, res, next) => { req.params.field = "country"; next(); }, customerController.getCustomersByField);
router.get("/city/:value", (req, res, next) => { req.params.field = "city"; next(); }, customerController.getCustomersByField);
router.get("/gender/:value", (req, res, next) => { req.params.field = "gender"; next(); }, customerController.getCustomersByField);
router.get("/age/:value", (req, res, next) => { req.params.field = "age"; next(); }, customerController.getCustomersByField);
router.get("/quarter/:value", (req, res, next) => { req.params.field = "signupQuarter"; next(); }, customerController.getCustomersByField);
router.get("/signup-quarter/:value", (req, res, next) => { req.params.field = "signupQuarter"; next(); }, customerController.getCustomersByField);
router.get("/filter/:filterType", customerController.getFilteredCustomers);

router
  .route("/")
  .get(validate(customerQuerySchema, "query"), customerController.getAllCustomers)
  .post(isAdmin, validate(createCustomerSchema), customerController.createCustomer);

router.get("/exists/:id", customerController.checkCustomerExists);

router
  .route("/:id")
  .get(customerController.getCustomerById)
  .put(isAdmin, validate(updateCustomerSchema), customerController.updateCustomer)
  .patch(isAdmin, validate(updateCustomerSchema), customerController.updateCustomer)
  .delete(isAdmin, customerController.deleteCustomer);

module.exports = router;
