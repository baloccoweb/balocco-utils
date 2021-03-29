const generalUtils = require("./utils/general");
const trackingUtils = require("./utils/tracking");

const BaloccoUtils = {
    ...generalUtils,
    ...trackingUtils
};

module.exports = BaloccoUtils;
