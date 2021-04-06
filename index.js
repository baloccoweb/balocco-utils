const generalUtils = require("./utils/general");
const trackingUtils = require("./utils/tracking");
const headersUtils = require("./utils/headers");
const DataStorage = require('./utils/DataStorage');
const AppStorage = require('./utils/AppStorage');
const ConfigHelper = require('./utils/ConfigHelper');
const Logger = require('./utils/Logger');

const BaloccoUtils = {
    ...generalUtils,
    ...trackingUtils,
    ...headersUtils,
    DataStorage,
    AppStorage,
    ConfigHelper,
    Logger
};

module.exports = BaloccoUtils;
