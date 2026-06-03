const Joi = require("joi");

const customerBaseSchema = {
  age: Joi.number().min(0).allow(null),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  country: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  membershipYears: Joi.number().min(0).required(),
  loginFrequency: Joi.number().min(0).required(),
  sessionDurationAvg: Joi.number().min(0).allow(null),
  pagesPerSession: Joi.number().min(0).allow(null),
  cartAbandonmentRate: Joi.number().min(0).max(100).required(),
  wishlistItems: Joi.number().min(0).allow(null),
  totalPurchases: Joi.number().min(0).required(),
  averageOrderValue: Joi.number().min(0).required(),
  daysSinceLastPurchase: Joi.number().min(0).allow(null),
  discountUsageRate: Joi.number().min(0).max(100).allow(null),
  returnsRate: Joi.number().min(0).max(100).allow(null),
  emailOpenRate: Joi.number().min(0).max(100).allow(null),
  customerServiceCalls: Joi.number().min(0).allow(null),
  productReviewsWritten: Joi.number().min(0).allow(null),
  socialMediaEngagementScore: Joi.number().min(0).max(100).allow(null),
  mobileAppUsage: Joi.number().min(0).allow(null),
  paymentMethodDiversity: Joi.number().min(0).allow(null),
  lifetimeValue: Joi.number().min(0).required(),
  creditBalance: Joi.number().allow(null),
  churned: Joi.boolean().required(),
  signupQuarter: Joi.string().valid("Q1", "Q2", "Q3", "Q4").required(),
};

const createCustomerBatchSchema = Joi.array().items(Joi.object(customerBaseSchema)).min(1);

const updateCustomerSchema = Joi.object({
  ...Object.fromEntries(
    Object.entries(customerBaseSchema).map(([key, value]) => [key, value.optional()])
  ),
}).min(1);

const customerQuerySchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1).max(100),
  sortBy: Joi.string(),
  sortOrder: Joi.string().valid("asc", "desc"),
  country: Joi.string(),
  city: Joi.string(),
  gender: Joi.string().valid("Male", "Female", "Other"),
  churned: Joi.boolean(),
  signupQuarter: Joi.string().valid("Q1", "Q2", "Q3", "Q4"),
  minAge: Joi.number().min(0),
  maxAge: Joi.number().min(0),
  minLTV: Joi.number().min(0),
  maxLTV: Joi.number().min(0),
  minPurchases: Joi.number().min(0),
  maxPurchases: Joi.number().min(0),
  minMembership: Joi.number().min(0),
  maxMembership: Joi.number().min(0),
  minLogin: Joi.number().min(0),
  maxLogin: Joi.number().min(0),
  minSession: Joi.number().min(0),
  maxSession: Joi.number().min(0),
  minAbandonment: Joi.number().min(0).max(100),
  maxAbandonment: Joi.number().min(0).max(100),
  minCredit: Joi.number(),
  maxCredit: Joi.number(),
  minDiscount: Joi.number().min(0).max(100),
  maxDiscount: Joi.number().min(0).max(100),
  minReviews: Joi.number().min(0),
  maxReviews: Joi.number().min(0),
});

module.exports = {
  createCustomerSchema: Joi.object(customerBaseSchema),
  createCustomerBatchSchema,
  updateCustomerSchema,
  customerQuerySchema,
};
