const mongoose = require("mongoose");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = function validateIssueQuery(req, res, next) {
  const {
    _id,
    open,
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
  } = req.query;

  const errors = [];

  if (_id && !isValidObjectId(_id)) {
    errors.push("Invalid issue _id format.");
  }

  if (open !== undefined && open !== "true" && open !== "false") {
    errors.push("Open must be 'true' or 'false'.");
  }

  const stringFields = {
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
  };

  Object.entries(stringFields).forEach(([key, val]) => {
    if (val && typeof val !== "string") {
      errors.push(`${key} must be a string.`);
    }
    if (typeof val === "string" && val.length > 150) {
      errors.push(`${key} is too long.`);
    }
  });

  const allowedStatuses = ["New", "Assigned", "In Progress (Accepted)", "Fixed"];
  if (status_text && !allowedStatuses.includes(status_text)) {
    errors.push(`Invalid status_text value: ${status_text}`);
  }

  if (errors.length) {
    return res.status(400).json({ error: "Validation failed", details: errors });
  }

  next();
};
