const { VORBIDDEN_ERROR } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
