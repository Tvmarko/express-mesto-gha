const BADREQUEST_ERROR = 400;
const NOTFOUND_ERROR = 404;
const AUTH_ERROR = 401;
const CONFLICT_ERROR = 409;
const VORBIDDEN_ERROR = 403;
const SERVER_ERROR = 500;

const URL_REGEX = /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([A-Za-z]{1,10})([\w\W\d]{1,})?$/;

module.exports = {
  BADREQUEST_ERROR,
  NOTFOUND_ERROR,
  AUTH_ERROR,
  CONFLICT_ERROR,
  VORBIDDEN_ERROR,
  SERVER_ERROR,
  URL_REGEX,
};
