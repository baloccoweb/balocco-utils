import { getRandom, BaloccoHttp, Logger, BaloccoFetch } from "../index.js";
import { HeadersHelper } from "../utils/HeadersHelper.js";
import { localeToLcidName } from "../utils/general.js";
import pkg from "../package.json" assert  { type: "json" };

//console.log(HeadersHelper.getRealFirefox("it"), HeadersHelper.randomFirefoxUA(), HeadersHelper.getAcceptLanguage("it"));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.NAVIGATE));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.NAVIGATE_CROSS));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_GET_HTML));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_POST_JSON));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_POST_JSON_FORM));

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log(getRandom(arr, 3));

BaloccoHttp.req("https://www.google.it", { mode: "got-scraping" }).then((response) => console.log(response.statusCode)).catch((e) => console.log(e));

console.log(localeToLcidName("it"), localeToLcidName("de"), localeToLcidName("en-US"));

Logger.startup(`.${pkg.name}`);
console.log(Logger.system.getFilePath());

BaloccoFetch.req("https://www.google.it").then((response) => console.log(response.status)).catch(e => console.error(e));