const { FCC_ANSWERS: fccErr, devOpsAnswers: prodErr } = require("./resError");
const { FCC_ANSWERS: fccOk, devOpsAnswers: prodOk } = require("./resSuccess");

const FCC_TESTS = process.env.FCC_TESTS;

const getResAns = (req = {}, key, isError = false) => {
    const source = FCC_TESTS
        ? isError
            ? fccErr
            : fccOk
        : isError
        ? prodErr
        : prodOk;

    let [methodKey, subKey] = key.includes(":")
        ? key.split(":")
        : [req.method, key];

    methodKey = methodKey.trim().toUpperCase();
    subKey = subKey.trim().toLowerCase();

    const answer = source?.[methodKey]?.[subKey];

    const defaultRes = isError
        ? { error: "Unexpected error occurred" }
        : { result: "Operation completed" };

    return typeof answer === "function" ? answer(req) : answer || defaultRes;
};

module.exports = getResAns;
