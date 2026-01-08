const mongoose = require("mongoose");

const ticketNotificationSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    recepientEmail: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["SUCCESS", "FAILED", "PENDING"],
        message: "Invalid Ticket Status",
      },
    },
  },
  { timestamps: true }
);

const ticketNotificationModel = mongoose.model(
  "TicketNotification",
  ticketNotificationSchema
);

module.exports = ticketNotificationModel;
