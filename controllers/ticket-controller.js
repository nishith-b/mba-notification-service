const { StatusCodes } = require("http-status-codes");
const notificationService = require("../services/notification-service");
const {
  ErrorResponseBody,
  SuccessResponseBody,
} = require("../utils/response-body");

const createTicket = async (req, res) => {
  try {
    const response = await notificationService.create(req.body);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully created a notification ticket";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

module.exports = { createTicket };
