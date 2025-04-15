const Log = require("../models/Log");

const logToMongoDB = async ({ level = "info", message, details = [], context = "" }) => {
  try {
    const log = new Log({ level, message, details, context });
    await log.save();
  } catch (err) {
    console.error("Failed to write log:", err); 
  }
};

module.exports = logToMongoDB;