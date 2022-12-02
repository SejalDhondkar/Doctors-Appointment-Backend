const express = require('express')
const bodyParser = require('body-parser')
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const docInfoRoute = require("./routes/doctorInfo");
const app = express()
const port = 4000

app.use(require("cors")());
app.use(bodyParser.json());


const dbConnect = require('./helpers/dbConnect')
require("dotenv").config();

const routePrefix = "api";
app.use(`/${routePrefix}`, authRoute);
app.use(`/${routePrefix}/user`, userRoute);
app.use(`/${routePrefix}/docinfo`, docInfoRoute);

app.listen(port, async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    console.log("Database Connected at: ", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db connection failed");
  }
})