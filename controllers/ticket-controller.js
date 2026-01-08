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
    return res.status(StatusCodes.CREATED).json(SuccessResponseBody);
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

const getAllTickets = async (req, res) => {
  try {
    const response = await notificationService.getAll();
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully fetched all the tickets...!";
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

const getTickets = async (req, res) => {
  try {
    const response = await notificationService.getById(req.params.id);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message =
      "Successfully fetched data of given ticket id";
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


module.exports = { createTicket, getAllTickets, getTickets };
