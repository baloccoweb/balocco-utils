const { gotScraping, got } = require('got-scraping');
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
    retry = undefined,
    followRedirect = false,
    http2 = true,
    mode = "got",
    headerGeneratorOptions = undefined,
    sessionToken = undefined
}) => {
    const options = {
        ...GotHelper.getDefaultOptions(locale, agent, timeout, http2),
        method,
        cookieJar,
        responseType,
        searchParams,
        json,
        body,
        followRedirect
    };

    if (headers) options.headers = headers;
    if (retry !== undefined && Number.isInteger(retry)) {
        options.retry = { limit: retry };
    }

    let request;
    switch (mode) {
        case "got":
            request = got(url, options);
            break;
        case "got-scraping":
            options.headerGeneratorOptions = headerGeneratorOptions;
            options.sessionToken = sessionToken;
            request = gotScraping(url, options);
            break;
        default:
            throw new Error(`Undefined req mode ${mode}`);
    }

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