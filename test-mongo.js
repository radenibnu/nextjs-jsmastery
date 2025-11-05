import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const uri = "mongodb://radenibnuqc_db_user:2z2gZJuLdFNi3zYB@cluster0-shard-00-00.qyy2yfh.mongodb.net:27017,cluster0-shard-00-01.qyy2yfh.mongodb.net:27017,cluster0-shard-00-02.qyy2yfh.mongodb.net:27017/?ssl=true&replicaSet=atlas-xxx-shard-0&authSource=admin&retryWrites=true&w=majority";


async function testConnection() {
  try {
    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected successfully!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
