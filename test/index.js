const { getRandom, BaloccoHttp, Logger, BaloccoFetch, GotHelper } = require("../index");
const HeadersHelper = require("../utils/HeadersHelper");
const { localeToLcidName } = require("../utils/general");
const pkg = require("../package.json");

//console.log(HeadersHelper.getRealFirefox("it"), HeadersHelper.randomFirefoxUA(), HeadersHelper.getAcceptLanguage("it"));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.NAVIGATE));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.NAVIGATE_CROSS));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_GET_HTML));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_POST_JSON));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_POST_JSON_FORM));

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log(getRandom(arr, 3));

BaloccoHttp.init()
    .then(() => {
        BaloccoHttp.req("https://api.ipify.org?format=json", { mode: "got-scraping" }).then((response) => console.log(response.statusCode, response.body));
        BaloccoFetch.req("https://api.ipify.org?format=json").then((response) => response.json()).then((response) => console.log(response)).catch(e => console.error(e));
    }).catch(e => console.log(e));

console.log(localeToLcidName("it"), localeToLcidName("de"), localeToLcidName("en-US"));

//Logger.startup(`.${pkg.name}`);
//console.log(Logger.system.getFilePath());

