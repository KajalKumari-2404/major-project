require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const connectDB = require("./Config/db");
const User = require("./Models/User");

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      await mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    const admin = await User.create({
      name: "JobConnect Admin",
      email: "admin@jobconnect.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password: Admin@123");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Create admin error:", error.message);
  }
};

createAdmin();