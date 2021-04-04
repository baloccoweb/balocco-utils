const { getRandomUserAgent, getLocale } = require("./general");

const getAmazonDefaultHeaders = (customHeaders = {}) => {
    const locale = getLocale();

    return Object.assign({}, {
        'user-agent': getRandomUserAgent(),
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': `${locale.substr(0, 2)},${locale};q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6`,
        ...(Math.round(Math.random()) ? { downlink: Math.floor(Math.random() * 30) + 10 } : {}),
        ...(Math.round(Math.random()) ? { rtt: Math.floor(Math.random() * 100) + 50 } : {}),
        ...(Math.round(Math.random()) ? { pragma: 'no-cache' } : {}),
        ...(Math.round(Math.random()) ? { ect: '4g' } : {}),
        ...(Math.round(Math.random()) ? { DNT: 1 } : {}),
    }, customHeaders);
}

const getAmdDefaultHeaders = (customHeaders = {}) => {
    const locale = getLocale();

    return Object.assign({}, {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': `${locale.substr(0, 2)},${locale};q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6`,
        ...(Math.round(Math.random()) ? { DNT: 1 } : {}),
        'cookie': `pmuser_country=${locale.substr(0, 2)}`
    }, customHeaders);
}

const getUnieuroDefaultHeaders = (customHeaders = {}) => {
    return Object.assign({}, {
        'user-agent': getRandomUserAgent(),
    }, customHeaders);
}

module.exports = {
    getAmazonDefaultHeaders,
    getAmdDefaultHeaders,
    getUnieuroDefaultHeaders
};
