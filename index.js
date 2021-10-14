const generalUtils = require("./utils/general");
const trackingUtils = require("./utils/tracking");
const HeadersHelper = require("./utils/HeadersHelper");
const userAgentsUtils = require("./utils/userAgents");
const DataStorage = require('./utils/DataStorage');
const AppStorage = require('./utils/AppStorage');
const ConfigHelper = require('./utils/ConfigHelper');
const BaloccoHttp = require('./utils/BaloccoHttp');
const GotHelper = require('./utils/GotHelper');
const Logger = require('./utils/Logger');

const BaloccoUtils = {
    ...generalUtils,
    ...trackingUtils,
    ...userAgentsUtils,
    DataStorage,
    AppStorage,
    ConfigHelper,
    Logger,
    HeadersHelper,
    BaloccoHttp,
    GotHelper
};

module.exports = BaloccoUtils;
