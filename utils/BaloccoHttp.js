const { got } = require('got-cjs');
const GotHelper = require('./GotHelper');

const req = async (url, {
    method = "GET",
    locale = "it",
    agent = null,
    cookieJar = undefined,
    headers = undefined,
    responseType = "text",
    searchParams = undefined,
    json = undefined,
    body = undefined,
    timeout = 5000,
    retry = undefined
}) => {
    const options = {
        ...GotHelper.getDefaultOptions(locale, agent),
        method,
        cookieJar,
        responseType,
        searchParams,
        json,
        body
    };

    if (headers) options.headers = headers;
    if (retry !== undefined && Number.isInteger(retry)) {
        options.retry = { limit: retry };
    }

    const request = got(url, options);

    if (agent) {
        const timeoutInst = setTimeout(() => request.cancel(), timeout);

        const response = await request;
        clearTimeout(timeoutInst);

        return response;
    } else {
        return await request;
    }
}

const BaloccoHttp = {
    req
};

module.exports = BaloccoHttp;