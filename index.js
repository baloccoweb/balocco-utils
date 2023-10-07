const generalUtils = require("./utils/general");
const trackingUtils = require("./utils/tracking");
const HeadersHelper = require("./utils/HeadersHelper");
const DataStorage = require('./utils/DataStorage');
const AppStorage = require('./utils/AppStorage');
const ConfigHelper = require('./utils/ConfigHelper');
const BaloccoHttp = require('./utils/BaloccoHttp');
const BaloccoFetch = require('./utils/BaloccoFetch');
const GotHelper = require('./utils/GotHelper');
const Logger = require('./utils/Logger');

const BaloccoUtils = {
    ...generalUtils,
    ...trackingUtils,
    DataStorage,
    AppStorage,
    ConfigHelper,
    Logger,
    HeadersHelper,
    BaloccoHttp,
    BaloccoFetch,
    GotHelper
};

module.exports = BaloccoUtils;
