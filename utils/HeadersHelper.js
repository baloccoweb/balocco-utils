const { randomIntFromInterval } = require("./general");

const CHROME_HEADERS = {
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'sec-ch-ua': '"Google Chrome";v="${CHROME_VERSION}", " Not;A Brand";v="99", "Chromium";v="${CHROME_VERSION}"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
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
    [92, "92.0.4515.159"],
    [93, "93.0.4577.63"],
    [93, "93.0.4577.82"],
    [94, "94.0.4606.41"],
    [95, "95.0.4636.4"],
    [95, "95.0.4638.69"]
];

const OS = [
    'Windows NT 10.0; Win64; x64',
    //TODO
];

const randomUA = () => {
    let exampleUA = CHROME_HEADERS['user-agent'];
    const chomeVersion = REAL_CHROME_VERSIONS[randomIntFromInterval(0, REAL_CHROME_VERSIONS.length - 1)];
    const osVersion = OS[randomIntFromInterval(0, OS.length - 1)];

    exampleUA = CHROME_HEADERS['user-agent'].replaceAll("${CHROME_BUILD}", chomeVersion[1])
        .replaceAll("${OS}", osVersion);

    return exampleUA;
};

const getRealChrome = (locale) => {
    const newHeaders = { ...CHROME_HEADERS };
    const chomeVersion = REAL_CHROME_VERSIONS[randomIntFromInterval(0, REAL_CHROME_VERSIONS.length - 1)];

    newHeaders["accept-language"] = newHeaders["accept-language"]
        .replace("${LOCALE_FULL}", locale + "-" + locale.toUpperCase())
        .replace("${LOCALE}", locale);

    newHeaders["sec-ch-ua"] = newHeaders["sec-ch-ua"]
        .replaceAll("${CHROME_VERSION}", chomeVersion[0]);

    newHeaders["user-agent"] = randomUA();

    return newHeaders;
}

const HeadersHelper = {
    getRealChrome,
    randomUA
}

module.exports = HeadersHelper;
