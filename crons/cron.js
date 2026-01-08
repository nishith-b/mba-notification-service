const cron = require("node-cron");
const Ticket = require("../models/ticket-notification");
const Mailer = require("../services/email-service");
const {
  verifyTicketNotificationCreateRequest,
} = require("../middlewares/ticket-middleware");

const mailerCron = () => {
  const mailer = Mailer(process.env.EMAIL, process.env.EMAIL_PASS);
  cron.schedule("*/2 * * * *", async () => {
    console.log("Excecuting cron ");
    const notificationsToBeSent = await Ticket.find({
      status: "PENDING",
    });
    notificationsToBeSent.forEach((notification) => {
      const mailData = {
        from: "mba@support.com",
        to: notification.recepientEmails,
        subject: notification.subject,
        text: notification.content,
      };
      mailer.sendMail(mailData, async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          const savedNotification = await Ticket.findOne({
            _id: notification._id,
          });
          savedNotification.status = "SUCCESS";
          savedNotification.save();
        }
      });
    });
  });
};

module.exports = { mailerCron };
