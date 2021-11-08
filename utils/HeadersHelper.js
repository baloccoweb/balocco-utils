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
    [90, "90.0.4430.93"],
    [90, "90.0.4430.212"],
    [91, "91.0.4472.77"],
    [91, "91.0.4472.114"],
    [92, "92.0.4515.107"],
    [92, "92.0.4515.159"],
    [93, "93.0.4577.63"],
    [93, "93.0.4577.82"],
    [94, "94.0.4606.41"],
    [94, "94.0.4606.61"],
    [95, "95.0.4636.4"],
    [95, "95.0.4638.69"]
];

const OS = [
    'Windows NT 10.0; Win64; x64',
    'X11; Linux x86_64',
    'Macintosh; Intel Mac OS X 10_14_6',
    'Macintosh; Intel Mac OS X 10_15_7'
    //TODO
];

const randomUA = () => {
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

    newHeaders["accept-language"] = newHeaders["accept-language"]
        .replace("${LOCALE_FULL}", locale + "-" + locale.toUpperCase())
        .replace("${LOCALE}", locale);

    const { ua, version, platform } = randomUA();

    newHeaders["sec-ch-ua"] = newHeaders["sec-ch-ua"]
        .replaceAll("${CHROME_VERSION}", version);

    newHeaders["user-agent"] = ua;
    newHeaders["sec-ch-ua-platform"] = platform;

    return newHeaders;
}

const HeadersHelper = {
    getRealChrome,
    randomUA
}

module.exports = HeadersHelper;
