const { HeadersHelper } = require("../index");

setInterval(() => {
    console.log(HeadersHelper.randomUA());
}, 1000);