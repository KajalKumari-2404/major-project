require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./Config/db");
const User = require("./Models/User");

const checkAdmin = async () => {
  try {
    await connectDB();

    const admins = await User.find({ role: "admin" }).select(
      "name email role isBlocked"
    );

    console.log("Admin users:");

    if (admins.length === 0) {
      console.log("No admin user found.");
    } else {
      console.log(admins);
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
};

checkAdmin();