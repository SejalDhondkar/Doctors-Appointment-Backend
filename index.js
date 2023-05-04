const express = require('express')
const bodyParser = require('body-parser')
const authRoute = require("./routes/auth");
//const mentalRoute = require("./routes/mentalHealthInfo.js");
const userRoute = require("./routes/user");
const docInfoRoute = require("./routes/doctorInfo");
const slotsRoute = require("./routes/slots");
const bookingRoute = require("./routes/booking");
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
app.use(`/${routePrefix}/slot`, slotsRoute);
app.use(`/${routePrefix}/booking`, bookingRoute);
//Priyank - mental health route
//app.use(`/${routePrefix}/mentalhealth`, mentalRoute);

app.listen(port, async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    console.log("Database Connected at: ", process.env.MONGO_URI);
  } catch (error) {
    console.log("Db connection failed");
  }
})