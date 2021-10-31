const { HeadersHelper, BaloccoHttp, GotHelper } = require("../index");

setTimeout(async () => {
    console.log(HeadersHelper.randomUA());
    console.log((await BaloccoHttp.req("https://api.ipify.org?format=json", {
        retry: 0,
        //agent: GotHelper.getAgent("socks4://192.141.236.10:5678")
    })).body);
}, 1000);