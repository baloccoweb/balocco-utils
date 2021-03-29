const generalUtils = require("./general");

function getAmazonUrlInfo(search) {
    const url = generalUtils.isValidUrl(search);
    if (url) {
        return {
            origin: url.origin,
            asin: url.pathname.split("dp/")[1].split("/")[0],
        };
    } else {
        throw "Invalid url";
    }
}

module.exports = {
    getAmazonUrlInfo
};
