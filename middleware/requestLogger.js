const logger = require("../utils/logger");

module.exports = function requestLogger(req, res, next) {
  const { method, originalUrl, body, query } = req;

  logger.info("Incoming Request", {
    method,
    url: originalUrl,
    body,
    query,
    time: new Date().toISOString(),
  });

  next();
};