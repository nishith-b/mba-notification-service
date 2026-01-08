const { StatusCodes } = require("http-status-codes");
const Ticket = require("../models/ticket-notification");

const create = async (data) => {
  try {
    const ticket = await Ticket.create(data);
    return ticket;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw {
        err,
        code: StatusCodes.UNPROCESSABLE_ENTITY,
      };
    }
    throw error;
  }
};

const getAll = async () => {
  try {
    const response = await Ticket.find();
    if (!response) {
      throw {
        err: "No Tickets Found..!",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const response = await Ticket.findById(id);
    if (!response) {
      throw {
        err: "No Tickets Found for given id..!",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  create,
  getAll,
  getById,
};
