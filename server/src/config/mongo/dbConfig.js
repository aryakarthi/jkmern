import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`connected to ${db.connection.host}`);
  } catch (error) {
    process.exit(1);
  }
};

export default connectMongoDB;