const { getLocale, randomChoice } = require("./general");
const { randomUserAgent } = require("./userAgents");

const getAmdDefaultHeaders = (customHeaders = []) => {
    const locale = getLocale();

    return [
        `user-agent: ${randomUserAgent({ browser: 'firefox' })}`,
        "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8",
        `accept-language: ${locale},${locale.substr(0, 2)};q=0.8,en-US;q=0.5,en;q=0.3`,
        "accept-encoding: gzip, deflate, br",
        "upgrade-insecure-requests: 1",
        "cache-control: no-cache",
        "pragma: no-cache",
    ].concat(customHeaders);
}

const getUnieuroDefaultHeaders = (customHeaders = []) => {
    const locale = getLocale();

    return [
        `user-agent: ${randomUserAgent()}`,
        'accept: application/json',
        'accept-encoding: gzip, deflate, br',
        `accept-language: ${locale},${locale.substr(0, 2)};q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6`,
        "cache-control: no-cache",
        "pragma: no-cache",
        "connection: close"
    ].concat(customHeaders);
}

module.exports = {
    getAmdDefaultHeaders,
    getUnieuroDefaultHeaders
};
