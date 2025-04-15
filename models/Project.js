const mongoose = require("mongoose");
const { Schema } = mongoose;

const { stringValidation } = require("./validators/stringValidation");

const ProjectData = new Schema({
    name: { ...stringValidation() },
    issue: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
});

const Project = mongoose.model("Project", ProjectData);

module.exports = { Project };