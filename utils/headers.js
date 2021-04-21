const { getRandomUserAgent, getLocale } = require("./general");

const getAmazonDefaultHeaders = (customHeaders = []) => {
    const locale = getLocale();

    return [
        `user-agent: ${getRandomUserAgent()}`,
        'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding: gzip, deflate, br',
        `accept-language: ${locale.substr(0, 2)},${locale};q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6`,
        'cache-control: no-cache',
        'pragma: no-cache',
        ...(Math.round(Math.random()) ? [`downlink: ${Math.floor(Math.random() * 30) + 10}`] : []),
        ...(Math.round(Math.random()) ? [`rtt: ${Math.floor(Math.random() * 100) + 50}`] : []),
        ...(Math.round(Math.random()) ? ['ect: 4g'] : []),
        ...(Math.round(Math.random()) ? ['DNT: 1'] : []),
    ].concat(customHeaders);
}

const getAmdDefaultHeaders = (customHeaders = []) => {
    const locale = getLocale();
    const firefoxVersion = Math.floor(Math.random() * 5) + 83;

    return [
        `user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:${firefoxVersion}.0) Gecko/20100101 Firefox/${firefoxVersion}.0`,
        "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8",
        `accept-language: ${locale},${locale.substr(0, 2)};q=0.8,en-US;q=0.5,en;q=0.3`,
        "accept-encoding: gzip, deflate, br",
        `cookie: pmuser_country=${locale.substr(0, 2)}`,
        "upgrade-insecure-requests: 1",
        "cache-control: no-cache",
        "pragma: no-cache",
    ].concat(customHeaders);
}

const getUnieuroDefaultHeaders = (customHeaders = []) => {
    return [
        `user-agent: ${getRandomUserAgent()}`,
    ].concat(customHeaders);
}

module.exports = {
    getAmazonDefaultHeaders,
    getAmdDefaultHeaders,
    getUnieuroDefaultHeaders
};
