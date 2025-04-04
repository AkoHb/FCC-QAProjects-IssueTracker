const mongoose = require("mongoose");
const { Schema } = mongoose;

const stringValidation = ({ min = 2, max = 25 } = {}) => {
    if (
        typeof min !== "number" ||
        typeof max !== "number" ||
        min < 2 ||
        max <= min
    ) {
        return {
            type: String,
            required: true,
            trim: true,
        };
    } else {
        return {
            type: String,
            required: true,
            trim: true,
            minLength: min,
            maxLength: max,
        };
    }
};

const IssueNote = new Schema({
    issue_title: {
        ...stringValidation(),
    },
    issue_text: {
        ...stringValidation({ max: 150 }),
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
        ...stringValidation({ max: 15 }),
    },
    assigned_to: {
        ...stringValidation({ max: 20 }),
    },
    open: {
        type: Boolean,
        default: false,
    },
    status_text: {
        type: String,
        enum: ["New", "Assigned", "In Progress (Accepted)", "Fixed"],
        default: "New",
    },
});

const Issue = mongoose.model("Issue", IssueNote);

const ProjectData = new Schema({
    name: { ...stringValidation() },
    issue: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
});

const Project = mongoose.model("Project", ProjectData);

module.exports = { Issue, Project };
