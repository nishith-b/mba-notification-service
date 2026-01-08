const nodemailer = require("nodemailer");

const sendMail = (userId, password) => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: userId,
      pass: password,
    },
  });

  transport.sendMail({
    from: "mba@support.com",
    to: "itsalrightnet@gmail.com",
    subject: "Test Email for node mailer",
    text: "This is a text email",
  });
};

module.exports = sendMail;
