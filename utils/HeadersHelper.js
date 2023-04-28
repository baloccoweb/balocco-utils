const { randomIntFromInterval } = require("./general");

const CHROME_HEADERS = {
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'sec-ch-ua': '"Google Chrome";v="${CHROME_VERSION}", " Not;A Brand";v="99", "Chromium";v="${CHROME_VERSION}"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"${PLATFORM}"',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (${OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME_BUILD} Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    'accept-language': '${LOCALE_FULL},${LOCALE};q=0.9'
}

//https://chromereleases.googleblog.com/
const REAL_CHROME_VERSIONS = [
    [112, "112.0.0.0"],
    [111, "111.0.0.0"],
    [110, "110.0.0.0"],
    [109, "109.0.0.0"],
    [108, "108.0.0.0"],
    [107, "107.0.0.0"],
    [106, "106.0.0.0"],
    [105, "105.0.0.0"],
    [104, "104.0.0.0"],
    [103, "103.0.0.0"],
];

const OS = [
    'Windows NT 10.0; Win64; x64',
    'X11; Linux x86_64',
    'Macintosh; Intel Mac OS X 13_2_1',
    'Macintosh; Intel Mac OS X 12_6',
    'Macintosh; Intel Mac OS X 12_3_1',
    'Macintosh; Intel Mac OS X 13_1'
    //TODO
];

const randomChromeUA = () => {
    const chomeVersion = REAL_CHROME_VERSIONS[randomIntFromInterval(0, REAL_CHROME_VERSIONS.length - 1)];
    const osVersion = OS[randomIntFromInterval(0, OS.length - 1)];

    let ua = CHROME_HEADERS['user-agent'].replaceAll("${CHROME_BUILD}", chomeVersion[1])
        .replaceAll("${OS}", osVersion);

    let platform = CHROME_HEADERS['sec-ch-ua-platform'];
    if (osVersion.includes("Windows")) {
        platform = platform.replace('${PLATFORM}', 'Windows');
    } else if (osVersion.includes("Linux")) {
        platform = platform.replace('${PLATFORM}', 'Linux');
    } else {
        platform = platform.replace('${PLATFORM}', 'macOS');
    }

    return { ua, version: chomeVersion[0], platform };
};

const getRealChrome = (locale) => {
    const newHeaders = { ...CHROME_HEADERS };

    if (["en-US", "en-GB"].includes(locale)) {
        newHeaders["accept-language"] = `${locale},en;q=0.5`;
    } else {
        newHeaders["accept-language"] = newHeaders["accept-language"]
            .replace("${LOCALE_FULL}", locale + "-" + locale.toUpperCase())
            .replace("${LOCALE}", locale);
    }

    const { ua, version, platform } = randomChromeUA();

    newHeaders["sec-ch-ua"] = newHeaders["sec-ch-ua"]
        .replaceAll("${CHROME_VERSION}", version);

    newHeaders["user-agent"] = ua;
    newHeaders["sec-ch-ua-platform"] = platform;

    return newHeaders;
}

const FIREFOX_TYPES = {
    NAVIGATE: 1,
    NAVIGATE_CROSS: 2,
    XHR_GET_HTML: 3,
    XHR_POST_JSON: 4,
    XHR_POST_JSON_FORM: 5
};

const REAL_FIREFOX_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:112.0) Gecko/20100101 Firefox/112.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:111.0) Gecko/20100101 Firefox/111.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:110.0) Gecko/20100101 Firefox/110.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13.3; rv:112.0) Gecko/20100101 Firefox/112.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13.2; rv:111.0) Gecko/20100101 Firefox/111.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13.2; rv:110.0) Gecko/20100101 Firefox/110.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13.1; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13.1; rv:108.0) Gecko/20100101 Firefox/108.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13.0; rv:107.0) Gecko/20100101 Firefox/107.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 13.0; rv:106.0) Gecko/20100101 Firefox/106.0",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:112.0) Gecko/20100101 Firefox/112.0",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:111.0) Gecko/20100101 Firefox/111.0",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:110.0) Gecko/20100101 Firefox/110.0",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:108.0) Gecko/20100101 Firefox/108.0",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:107.0) Gecko/20100101 Firefox/107.0",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:106.0) Gecko/20100101 Firefox/106.0",
];

const defaultFirefoxXhrLowerHeaders = {
    'Accept-Encoding': 'gzip, deflate, br',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Cache-Control': 'no-cache',
    'TE': 'trailers',
};

const randomFirefoxUA = () => {
    return REAL_FIREFOX_AGENTS[randomIntFromInterval(0, REAL_FIREFOX_AGENTS.length - 1)];
}

const getAcceptLanguage = (locale = "it") => {
    if (["en-US", "en-GB"].includes(locale)) {
        return `${locale},en;q=0.5`;
    }

    return `${locale}-${locale.toUpperCase()},${locale};q=0.8,en-US;q=0.5,en;q=0.3`;
}

const getRealFirefox = (locale, type = FIREFOX_TYPES.NAVIGATE) => {
    const userAgent = randomFirefoxUA();
    const acceptLanguage = getAcceptLanguage(locale);

    switch (type) {
        case FIREFOX_TYPES.XHR_GET_HTML:
            return {
                'User-Agent': userAgent,
                'Accept': 'text/html,*/*',
                'Accept-Language': acceptLanguage,
                ...defaultFirefoxXhrLowerHeaders
            };
        case FIREFOX_TYPES.XHR_POST_JSON:
        case FIREFOX_TYPES.XHR_POST_JSON_FORM:
            return {
                'User-Agent': userAgent,
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': acceptLanguage,
                'Content-Type': type === FIREFOX_TYPES.XHR_POST_JSON_FORM ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json; charset=utf-8',
                ...defaultFirefoxXhrLowerHeaders
            };
        default:
            return {
                'User-Agent': userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': acceptLanguage,
                'Accept-Encoding': 'gzip, deflate, br',
                'Pragma': 'no-cache',
                'DNT': '1',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': type === FIREFOX_TYPES.NAVIGATE_CROSS ? 'same-origin' : 'none',
                'Sec-Fetch-User': '?1',
                'Cache-Control': 'no-cache',
                'TE': 'trailers',
            };
    }
}

const HeadersHelper = {
    getRealChrome,
    getRealFirefox,
    randomChromeUA,
    randomFirefoxUA,
    getAcceptLanguage,
    FIREFOX_TYPES
}

module.exports = HeadersHelper;
