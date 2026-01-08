const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

//const sendMail = require("./services/email-service");
const cron = require("./crons/cron");
const app = express();

const TicketRoutes = require("./routes/ticket-route");

env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

TicketRoutes(app);

app.listen(process.env.PORT, async () => {
  console.log("Notification server started");
  //sendMail(process.env.EMAIL, process.env.EMAIL_PASS);
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to mongoose..!");
  } catch (error) {
    console.log(error);
  }
  cron.mailerCron();
});
