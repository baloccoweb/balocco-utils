const { HeadersHelper, BaloccoHttp } = require("../index");

setTimeout(async () => {
    console.log(HeadersHelper.randomUA());
    console.log(await BaloccoHttp.req("https://api.ipify.org?format=json", {}));
}, 1000);