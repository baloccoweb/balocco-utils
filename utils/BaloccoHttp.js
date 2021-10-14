const got = require('got');
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
    timeout = 5000
}) => {
    const options = {
        ...GotHelper.getDefaultOptions(locale, agent),
        method,
        cookieJar,
        responseType,
        searchParams,
        json,
    };

    if (headers) options.headers = headers;

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