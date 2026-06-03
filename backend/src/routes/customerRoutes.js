const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const validate = require("../middlewares/validationMiddleware");
const {
  createCustomerSchema,
  createCustomerBatchSchema,
  updateCustomerSchema,
  customerQuerySchema,
} = require("../validations/customerValidation");

router.post("/bulk-create", validate(createCustomerBatchSchema), customerController.bulkCreateCustomers);
router.patch("/bulk-update", customerController.bulkUpdateCustomers);
router.delete("/bulk-delete", customerController.bulkDeleteCustomers);

router.get("/search", customerController.searchCustomers);

// Specialized Information Routes
router.get("/status/:status", customerController.getCustomersByStatus);
router.get("/segment/:segment", customerController.getCustomersBySegment);
router.get("/field/:field/:value", customerController.getCustomersByField);
router.get("/analytics/:field", customerController.getCustomersByAnalytics);
router.get("/sort/:field/:order", customerController.getSortedCustomers);
router.get("/filter/:filterType", customerController.getFilteredCustomers);

router
  .route("/")
  .get(validate(customerQuerySchema, "query"), customerController.getAllCustomers)
  .post(validate(createCustomerSchema), customerController.createCustomer);

router.get("/exists/:id", customerController.checkCustomerExists);

router
  .route("/:id")
  .get(customerController.getCustomerById)
  .put(validate(updateCustomerSchema), customerController.updateCustomer)
  .patch(validate(updateCustomerSchema), customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

module.exports = router;
