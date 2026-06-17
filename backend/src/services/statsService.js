const Customer = require("../models/customerModel");

class StatsService {
  /**
   * Part 24: Basic Customer Statistics
   */
  async getOverviewStats() {
    const stats = await Customer.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: null,
          totalCustomers: { $sum: 1 },
          avgAge: { $avg: "$age" },
          avgLTV: { $avg: "$lifetimeValue" },
          totalPurchases: { $sum: "$totalPurchases" },
          avgOrderValue: { $avg: "$averageOrderValue" },
          avgLoginFrequency: { $avg: "$loginFrequency" },
        },
      },
    ]);
    return stats[0] || {};
  }

  async getDistribution(field) {
    return await Customer.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: `$${field}`,
          count: { $sum: 1 },
          percentage: { $sum: 1 }, // Will calculate properly in next stage if needed
        },
      },
      { $sort: { count: -1 } },
    ]);
  }

  /**
   * Part 25: Advanced Analytics
   */
  async getTopCustomers(limit = 10, sortBy = "lifetimeValue") {
    return await Customer.find({ isDeleted: false })
      .sort({ [sortBy]: -1 })
      .limit(limit);
  }

  async getChurnAnalysis() {
    return await Customer.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$churned",
          count: { $sum: 1 },
          avgLTV: { $avg: "$lifetimeValue" },
          avgMembership: { $avg: "$membershipYears" },
        },
      },
    ]);
  }

  /**
   * Part 27: Insights & Predictions (Rule-based)
   */
  async getAtRiskCustomers(limit = 10) {
    // Prediction logic: High abandonment AND no recent purchase
    return await Customer.find({
      isDeleted: false,
      churned: false,
      cartAbandonmentRate: { $gt: 70 },
      daysSinceLastPurchase: { $gt: 30 },
    })
      .sort({ cartAbandonmentRate: -1 })
      .limit(limit);
  }

  /**
   * Part 28: Dashboard Summary
   */
  async getDashboardSummary() {
    const overview = await this.getOverviewStats();
    const churn = await this.getChurnAnalysis();
    const topCountries = await this.getDistribution("country");
    
    return {
      overview,
      churnDistribution: churn,
      topMarkets: topCountries.slice(0, 5),
      timestamp: new Date(),
    };
  }

  /**
   * Part 26: Random Customer
   */
  async getRandomCustomer() {
    const count = await Customer.countDocuments({ isDeleted: false });
    const random = Math.floor(Math.random() * count);
    return await Customer.findOne({ isDeleted: false }).skip(random);
  }
}

module.exports = new StatsService();
