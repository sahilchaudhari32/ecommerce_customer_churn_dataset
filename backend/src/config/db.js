const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing from environment variables");
  }

  try {
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (error.name === "MongooseServerSelectionError") {
      console.error("❌ MongoDB Connection Error: Server Selection Failed.");
      console.error("👉 Common cause: Your IP address might not be whitelisted in MongoDB Atlas.");
      console.error("👉 Action: Check your Atlas 'Network Access' settings and add your current IP.");
    }
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
