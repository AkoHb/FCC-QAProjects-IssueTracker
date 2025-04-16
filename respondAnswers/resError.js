/**
 * FCC_ANSWERS object contain all valid responds grouped by request type
 */

const FCC_ANSWERS = {
    DELETE: {
        missing_id: { error: "missing _id" },
        could_not_delete: (req) => ({ error: "could not delete", '_id': req?.body?._id }),
    },
    GET: {},
    PUT: {
        missing_id: { error: "missing _id" },
        could_not_update: (req) => ({ error: "could not update", '_id': req?.body?._id }),
        no_update_fields: (req) => ({
            error: "no update field(s) sent",
            _id: req?.body?._id,
        }),
    },
    POST: {
        required_field_missing: { error: "required field(s) missing" },
    },
};

/**
 * devOpsAnswers contain all responds on production state
 */
const devOpsAnswers = {
    DELETE: {
        missing_id: { error: "ID is required for deletion" },
        could_not_delete: { error: "Failed to delete issue" },
    },
    GET: {
        not_found: { error: "No issues found" },
        invalid_query: { error: "Invalid query parameters" },
    },
    PUT: {
        missing_id: { error: "ID is required for update" },
        no_update_fields: { error: "No update fields provided" },
        could_not_update: { error: "Failed to update issue" },
    },
    POST: {
        required_field_missing: { error: "All required fields must be filled" },
        could_not_create: { error: "Failed to create issue" },
    },
};



module.exports = {
    FCC_ANSWERS,
    devOpsAnswers,
};
