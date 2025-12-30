const mongoose = require("mongoose");
require("dotenv").config();




const connectDB = async () => {

  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: false,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }


  
};

module.exports = connectDB;
