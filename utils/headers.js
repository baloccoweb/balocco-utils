const { getLocale, randomChoice } = require("./general");
const { randomUserAgent } = require("./userAgents");

const getAmazonDefaultHeaders = (customHeaders = []) => {
    const locale = getLocale();

    return [
        `user-agent: ${randomUserAgent()}`,
        'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding: gzip, deflate, br',
        `accept-language: ${locale.substr(0, 2)},${locale};q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6`,
        'cache-control: max-age=0',
        ...randomChoice([`downlink: ${Math.floor(Math.random() * 30) + 10}`], []),
        ...randomChoice([`rtt: ${Math.floor(Math.random() * 100) + 50}`], []),
        ...randomChoice(['ect: 4g'], []),
        ...randomChoice(['DNT: 1'], [])
    ].concat(customHeaders);
}

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
    getAmazonDefaultHeaders,
    getAmdDefaultHeaders,
    getUnieuroDefaultHeaders
};
