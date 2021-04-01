const generalUtils = require("./utils/general");
const trackingUtils = require("./utils/tracking");
const DataStorage = require('./utils/DataStorage');
const ConfigHelper = require('./utils/ConfigHelper');

const BaloccoUtils = {
    ...generalUtils,
    ...trackingUtils,
    DataStorage,
    ConfigHelper
};

module.exports = BaloccoUtils;
