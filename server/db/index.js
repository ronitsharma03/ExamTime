const dotenv = require("dotenv");
const ConnectionString = require('mongodb-connection-string-url');
const mongoose = require("mongoose");
const DB_NAME = require("../constants.js");

dotenv.config({
  path: ".env",
});

const connectDB = async () => {
  try {
  
    const connectionInstance = await mongoose.connect("mongodb+srv://ronitkhajuria03:rksharma@cluster0.qx4xpmb.mongodb.net/Exam_time");
    // 
    console.log(
      `\nMONGODB Connected !! HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("From catch")
    console.log("Error: " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
