/**
 * Utility to build MongoDB query filters from request query parameters
 */
const buildCustomerFilter = (query) => {
  const filter = { isDeleted: false };

  // Categorical Filters
  if (query.gender) filter.gender = query.gender;
  if (query.country) filter.country = query.country;
  if (query.city) filter.city = query.city;
  if (query.signupQuarter) filter.signupQuarter = query.signupQuarter;
  if (query.churned !== undefined) {
    filter.churned = query.churned === "true" || query.churned === true;
  }

  // Numeric Range Helper
  const addRangeFilter = (paramName, dbFieldName) => {
    const min = query[`min${paramName}`];
    const max = query[`max${paramName}`];

    if (min !== undefined || max !== undefined) {
      filter[dbFieldName] = {};
      if (min !== undefined) filter[dbFieldName].$gte = Number(min);
      if (max !== undefined) filter[dbFieldName].$lte = Number(max);
    }
  };

  // Apply Range Filters
  addRangeFilter("Age", "age");
  addRangeFilter("LTV", "lifetimeValue");
  addRangeFilter("Purchases", "totalPurchases");
  addRangeFilter("Membership", "membershipYears");
  addRangeFilter("Login", "loginFrequency");
  addRangeFilter("Session", "sessionDurationAvg");
  addRangeFilter("Abandonment", "cartAbandonmentRate");
  addRangeFilter("Credit", "creditBalance");
  addRangeFilter("Discount", "discountUsageRate");
  addRangeFilter("Reviews", "productReviewsWritten");

  return filter;
};

module.exports = buildCustomerFilter;
