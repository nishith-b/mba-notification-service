const cron = require("node-cron");
const Ticket = require("../models/ticket-notification");
const Mailer = require("../services/email-service");

const mailerCron = () => {
  const mailer = Mailer(process.env.EMAIL, process.env.EMAIL_PASS);

  cron.schedule("*/2 * * * *", async () => {
    console.log("⏰ Executing cron");

    try {
      const notificationsToBeSent = await Ticket.find({ status: "PENDING" });

      for (const notification of notificationsToBeSent) {
        const mailData = {
          from: process.env.EMAIL, 
          to: notification.recepientEmails,
          subject: notification.subject,
          text: notification.content,
        };

        try {
          const info = await mailer.sendMail(mailData);
          console.log("✅ Mail sent:", info.response);

          await Ticket.updateOne(
            { _id: notification._id },
            { status: "SUCCESS" }
          );
        } catch (mailErr) {
          console.error("❌ Mail error:", mailErr.message);
        }
      }
    } catch (err) {
      console.error("❌ Cron failed:", err);
    }
  });
};

module.exports = { mailerCron };
