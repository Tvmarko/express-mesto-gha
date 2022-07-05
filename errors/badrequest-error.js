const { BADREQUEST_ERROR } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BADREQUEST_ERROR;
  }
}

module.exports = BadRequestError;
