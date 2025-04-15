"use strict";

const { Issue, Project, Log } = require("./models");
const { ObjectId } = require("mongodb");
const express = require("express");

const validateQueryParams = require("../models/validators/validateQueryParams");
const requestLogger = require("../middleware/requestLogger");

module.exports = function (app) {
    app.use(express.json());
    app.use(requestLogger);

    app.route("/api/issues/:project")

        .get(validateQueryParams, async function (req, res) {
            const { project } = req.params;
            const {
                _id,
                open,
                issue_title,
                issue_text,
                created_by,
                assigned_to,
                status_text,
            } = req.query;

            const queryParams = {
                ...(_id && { _id: ObjectId(_id) }),
                ...(open && { open: open }),
                ...(issue_title && { issue_title: issue_title }),
                ...(issue_text && { issue_text: issue_text }),
                ...(created_by && { created_by: created_by }),
                ...(assigned_to && { assigned_to: assigned_to }),
                ...(status_text && { status_text: status_text }),
            };

            try {
                const data = await Project.aggregate([
                    { $match: { name: project } },
                    { $unwind: "$issues" },
                    { $match: queryParams },
                ]);

                if (!data || data.length === 0) {
                    res.json([]);
                } else {
                    let mappedData = data.map((item) => item.issues);
                    res.json(mappedData);
                }
            } catch (err) {
                res.status(500).json({
                    error: "Failed to fetch issues",
                    details: err.message,
                });
            } finally {
                await requestLogger(req, res);
            }
        })

        .post(validateQueryParams, async function (req, res) {
            const { project } = req.params;
        })

        .put(validateQueryParams, async function (req, res) {
            const { project } = req.params;
        })

        .delete(validateQueryParams, async function (req, res) {
            const { project } = req.params;
        });
};
