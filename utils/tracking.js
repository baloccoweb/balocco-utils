const generalUtils = require("./general");

const getAmazonUrlInfo = (search) => {
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

const getUnieuroUrlInfo = (search) => {
    const url = generalUtils.isValidUrl(search);
    if (url) {



        return {
            origin: url.origin,
            sku: url.pathname.split('/').pop().split('-pid').pop(),
        };
    } else {
        throw "Invalid url";
    }
}

module.exports = {
    getAmazonUrlInfo,
    getUnieuroUrlInfo
};
