const { getLocale } = require("./general");
const { randomUserAgent } = require("./userAgents");

const getUnieuroDefaultHeaders = (customHeaders = []) => {
    const locale = getLocale();

    return [
        `user-agent: ${randomUserAgent()}`,
        'accept: application/json',
        `accept-language: ${locale},${locale.substr(0, 2)};q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6`,
        "cache-control: no-cache",
        "pragma: no-cache",
        "connection: close"
    ].concat(customHeaders);
}

module.exports = {
    getUnieuroDefaultHeaders
};
