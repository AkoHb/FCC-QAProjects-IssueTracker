export const stringValidation = ({ min = 2, max = 25 } = {}) => {
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