import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const maskUri = (u) => {
  if (!u) return "(<no URI provided>)";
  try {
    return u.replace(/:\/\/([^@]+)@/, "//*****@");
  } catch {
    return "(<masked>)";
  }
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || null;

  if (!uri) {
    console.error("No MongoDB URI found. Set MONGODB_URI or MONGO_URI in .env");
    process.exit(1);
  }

  const maxRetries = parseInt(process.env.DB_CONNECT_RETRIES, 10) || 5;
  const baseDelayMs = parseInt(process.env.DB_CONNECT_DELAY_MS, 10) || 2000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `Connecting to MongoDB (attempt ${attempt}/${maxRetries}) to ${maskUri(uri)}...`
      );
      const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      const connectionTime = new Date().toLocaleString();
      console.log(
        `MongoDB Connected: ${conn.connection.host} at ${connectionTime}`
      );
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt - 1);
        console.log(`Retrying MongoDB connection in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error("All MongoDB connection attempts failed. Exiting.");
        process.exit(1);
      }
    }
  }
};

export default connectDB;
