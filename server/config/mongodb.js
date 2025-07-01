import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const connectDB = async () => {
  try {
    const dbUri = `${process.env.MONGO_URI}/imagify`;
    await mongoose.connect(dbUri);

  } catch (error) {
    console.error("Initial MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
