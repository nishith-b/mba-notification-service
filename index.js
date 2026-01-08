const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { mailerCron } = require("./crons/cron");
const TicketRoutes = require("./routes/ticket-route");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

TicketRoutes(app);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Successfully connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Notification server started on port ${process.env.PORT}`);
    });

    mailerCron();
    console.log("⏰ Mailer cron started");

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
