import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
export async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  console.log("Connected to MongoDB");
}
