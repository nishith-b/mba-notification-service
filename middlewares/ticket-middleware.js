const { StatusCodes } = require("http-status-codes");
const { ErrorResponseBody } = require("../utils/response-body");

const verifyTicketNotificationCreateRequest = async (req, res, next) => {
  if (!req.body.subject) {
    ErrorResponseBody.err = "No subject given for the mail";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  if (!req.body.content) {
    ErrorResponseBody.err = "No Content given for the mail";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  if (
    !Array.isArray(req.body.recepientEmails) ||
    req.body.recepientEmails.length === 0
  ) {
    ErrorResponseBody.err = "No Recepient Email ids given";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }
  next();
};

module.exports = { verifyTicketNotificationCreateRequest };
