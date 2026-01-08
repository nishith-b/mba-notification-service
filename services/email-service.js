const nodemailer = require("nodemailer");

const mailer = (userId, password) => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: userId,
      pass: password,
    },
  });

  return transport;
};

module.exports = mailer;
