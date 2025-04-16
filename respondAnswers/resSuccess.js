/**
 * FCC_ANSWERS object contain all valid responds grouped by request type
 */

const FCC_ANSWERS = {
    DELETE: {
        success: (req) => ({ result: "successfully deleted", '_id': req.body._id }),
    },
    GET: {},
    PUT: {
        success: (req) => ({ result: "successfully updated", '_id': req.body._id }),
    },
    POST: {},
};

/**
 * devOpsAnswers contain all responds on production state
 */
const devOpsAnswers = {
    DELETE: {
        success: (req) => ({ result: "Issue deleted", _id: req.body._id }),
    },
    GET: {
        success: (req) => ({ result: "Issues retrieved", data: req.body }),
    },
    PUT: {
        success: (req) => ({ result: "Issue updated", _id: req.body._id }),
    },
    POST: {
        success: (req) => ({
            result: "Issue created",
            issue: req.body
        }),
    },
};

module.exports = {
    FCC_ANSWERS,
    devOpsAnswers,
};
