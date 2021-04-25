const generalUtils = require("./utils/general");
const trackingUtils = require("./utils/tracking");
const headersUtils = require("./utils/headers");
const userAgentsUtils = require("./utils/userAgents");
const DataStorage = require('./utils/DataStorage');
const AppStorage = require('./utils/AppStorage');
const ConfigHelper = require('./utils/ConfigHelper');
const Logger = require('./utils/Logger');

const BaloccoUtils = {
    ...generalUtils,
    ...trackingUtils,
    ...headersUtils,
    ...userAgentsUtils,
    DataStorage,
    AppStorage,
    ConfigHelper,
    Logger
};

module.exports = BaloccoUtils;
