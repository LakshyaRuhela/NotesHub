import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Db connected");
  } catch (err) {
    console.log("DB error");
  }
};

export default connectDb;
