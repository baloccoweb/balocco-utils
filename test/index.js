const { getRandom } = require("../index");
const HeadersHelper = require("../utils/HeadersHelper");

//console.log(HeadersHelper.getRealFirefox("it"));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.NAVIGATE));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.NAVIGATE_CROSS));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_GET_HTML));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_POST_JSON));
//console.log(HeadersHelper.getRealFirefox("it", HeadersHelper.FIREFOX_TYPES.XHR_POST_JSON_FORM));

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log(getRandom(arr, 3));