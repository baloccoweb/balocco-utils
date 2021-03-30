const generalUtils = require("./utils/general");
const trackingUtils = require("./utils/tracking");
const DataStorage = require('./utils/DataStorage');

const BaloccoUtils = {
    ...generalUtils,
    ...trackingUtils,
    DataStorage
};

module.exports = BaloccoUtils;
