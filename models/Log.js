const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: { type: String, enum: ["info", "warn", "error"], default: "info" },
  message: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
  context: String,
});

module.exports = mongoose.model("Log", logSchema);