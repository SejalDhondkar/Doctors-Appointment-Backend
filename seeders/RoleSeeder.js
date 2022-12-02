const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = require("../helpers/dbConnect");

const connectToMongo = async () => {
  await dbConnect(process.env.MONGO_URI);
};
connectToMongo();

const Role = require("../models/role");

const seedRole = [
  { name: 'Admin' },
  { name: 'Doctor' },
  { name: 'Patient'}
];

const seedData = async () => {
  try {
    await Role.deleteMany({});
    await Role.insertMany(seedRole);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    res.status(500).json({error});
  }
};

seedData().then(() => {
  mongoose.connection.close();
});
