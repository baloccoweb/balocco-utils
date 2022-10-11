const { getRandom, BaloccoHttp } = require("../index");
const HeadersHelper = require("../utils/HeadersHelper");
const {localeToLcidName} = require("../utils/general");

//console.log(HeadersHelper.getRealFirefox("it"));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.NAVIGATE));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.NAVIGATE_CROSS));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_GET_HTML));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_POST_JSON));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_POST_JSON_FORM));

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log(getRandom(arr, 3));

BaloccoHttp.req("https://www.google.it", {});

console.log(localeToLcidName("it"), localeToLcidName("de"), localeToLcidName("en-US"));