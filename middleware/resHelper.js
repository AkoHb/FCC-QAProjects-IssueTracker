const { getResAns } = require("../respondAnswers/getResAns");

const attachResponseHelpers = (req, res, next) => {
    res.sendOk = (key) => res.status(200).json(getResAns(req, key));
    res.sendErr = (key, code = 400) =>
        res.status(code).json(getResAns(req, key, true));
    next();
};

module.exports = attachResponseHelpers;
