const mongoose = require("mongoose");

const logToMongoDB = require("../../utils/logger");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = async function validateIssueQuery(req, res, next) {
    const errors = [];

    const isGetRequest = req.method === "GET";
    const isPostOrPutRequest = ["POST", "PUT"].includes(req.method);

    if (isGetRequest) {
        const {
            _id,
            open,
            issue_title,
            issue_text,
            created_by,
            assigned_to,
            status_text,
        } = req.query;

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

        const allowedStatuses = [
            "New",
            "Assigned",
            "In Progress (Accepted)",
            "Fixed",
        ];
        if (status_text && !allowedStatuses.includes(status_text)) {
            errors.push(`Invalid status_text value: ${status_text}`);
        }
    }

    if (isPostOrPutRequest) {
        const {
            _id,
            issue_title,
            issue_text,
            created_by,
            assigned_to,
            status_text,
            open,
        } = req.body;

        if (_id && !isValidObjectId(_id)) {
            errors.push("Invalid issue _id format.");
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

        const allowedStatuses = [
            "New",
            "Assigned",
            "In Progress (Accepted)",
            "Fixed",
        ];
        if (status_text && !allowedStatuses.includes(status_text)) {
            errors.push(`Invalid status_text value: ${status_text}`);
        }

        if (open !== undefined && open !== true && open !== false) {
            errors.push("Open must be 'true' or 'false'.");
        }
    }

    if (errors.length) {
        await logToMongoDB({
            level: "warn",
            message: "Validation failed in issue query",
            data: errors,
            context: "validateIssueQuery",
        });

        return res
            .status(400)
            .json({ error: "Validation failed", details: errors });
    }

    await logToMongoDB({
        level: "info",
        message: "Validation passed in issue query",
        context: "validateIssueQuery",
        meta: {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
        },
    });

    next();
};
