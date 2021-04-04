const generalUtils = require("./utils/general");
const trackingUtils = require("./utils/tracking");
const DataStorage = require('./utils/DataStorage');
const ConfigHelper = require('./utils/ConfigHelper');
const Logger = require('./utils/Logger');

const BaloccoUtils = {
    ...generalUtils,
    ...trackingUtils,
    DataStorage,
    ConfigHelper,
    Logger
};

module.exports = BaloccoUtils;
