require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Customer = require("../models/customerModel");
const connectDB = require("../config/db");

const DATASET_PATH = path.join(__dirname, "../../ecommerce_customer_churn_dataset.json");

const seedDatabase = async () => {
  try {
    await connectDB();

    if (!fs.existsSync(DATASET_PATH)) {
      console.error(`Error: Dataset file not found at ${DATASET_PATH}`);
      console.log("Please add the 'ecommerce_customer_churn_dataset.json' file to the backend root directory.");
      process.exit(1);
    }

    console.log("Reading dataset file...");
    const rawData = JSON.parse(fs.readFileSync(DATASET_PATH, "utf-8"));
    console.log(`Found ${rawData.length} records. Processing...`);

    const processedData = rawData.map((item) => {
      // Helper to convert string to number or null
      const toNumber = (val) => {
        if (val === "" || val === undefined || val === null) return null;
        return Number(val);
      };

      return {
        age: toNumber(item.Age),
        gender: item.Gender,
        country: item.Country,
        city: item.City,
        membershipYears: toNumber(item.Membership_Years),
        loginFrequency: toNumber(item.Login_Frequency),
        sessionDurationAvg: toNumber(item.Session_Duration_Avg),
        pagesPerSession: toNumber(item.Pages_Per_Session),
        cartAbandonmentRate: toNumber(item.Cart_Abandonment_Rate),
        wishlistItems: toNumber(item.Wishlist_Items),
        totalPurchases: toNumber(item.Total_Purchases),
        averageOrderValue: toNumber(item.Average_Order_Value),
        daysSinceLastPurchase: toNumber(item.Days_Since_Last_Purchase),
        discountUsageRate: toNumber(item.Discount_Usage_Rate),
        returnsRate: toNumber(item.Returns_Rate),
        emailOpenRate: toNumber(item.Email_Open_Rate),
        customerServiceCalls: toNumber(item.Customer_Service_Calls),
        productReviewsWritten: toNumber(item.Product_Reviews_Written),
        socialMediaEngagementScore: toNumber(item.Social_Media_Engagement_Score),
        mobileAppUsage: toNumber(item.Mobile_App_Usage),
        paymentMethodDiversity: toNumber(item.Payment_Method_Diversity),
        lifetimeValue: toNumber(item.Lifetime_Value),
        creditBalance: toNumber(item.Credit_Balance),
        churned: item.Churned === 1 || item.Churned === "1",
        signupQuarter: item.Signup_Quarter,
        isDeleted: false,
      };
    });

    console.log("Cleaning existing data...");
    await Customer.deleteMany({});

    console.log("Inserting processed records into MongoDB...");
    const result = await Customer.insertMany(processedData, { ordered: false });
    console.log(`Success! Inserted ${result.length} customer records.`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
