const mongoose = require("mongoose");
const { Schema } = mongoose;

const { stringValidation } = require("./validators/stringValidation");
const {
    allowedStatuses,
    maxStringLength,
    defaultIssueTitleLength,
    defaultCreatedByLength,
    defaultAssignedToLength,
} = require("./config/constants");

const IssueNote = new Schema({
    issue_title: {
        ...stringValidation(defaultIssueTitleLength),
    },
    issue_text: {
        ...stringValidation({ max: maxStringLength }),
    },
    created_data: {
        type: Date,
        default: Date.now,
    },
    updated_data: {
        type: Date,
        default: Date.now,
    },
    created_by: {
        ...stringValidation({ max: defaultCreatedByLength }),
    },
    assigned_to: {
        ...stringValidation({ max: defaultAssignedToLength }),
    },
    open: {
        type: Boolean,
        default: false,
    },
    status_text: {
        type: String,
        enum: allowedStatuses,
        default: "New",
    },
});

const Issue = mongoose.model("Issue", IssueNote);

module.exports = { Issue };
