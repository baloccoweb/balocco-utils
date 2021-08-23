const { randomChoice } = require("./general");

const CHROME_OS = [
    'Macintosh; Intel Mac OS X 11_5_2',
    'Macintosh; Intel Mac OS X 11_2_3',
    'Macintosh; Intel Mac OS X 11_2_0',
    'Macintosh; Intel Mac OS X 10_15_7',
    'Macintosh; Intel Mac OS X 10_15_5',
    'Macintosh; Intel Mac OS X 10_11_6',
    'Macintosh; Intel Mac OS X 10_6_6',
    'Macintosh; Intel Mac OS X 10_9_5',
    'Macintosh; Intel Mac OS X 10_10_5',
    'Macintosh; Intel Mac OS X 10_7_5',
    'Macintosh; Intel Mac OS X 10_11_3',
    'Macintosh; Intel Mac OS X 10_10_3',
    'Macintosh; Intel Mac OS X 10_6_8',
    'Macintosh; Intel Mac OS X 10_10_2',
    'Macintosh; Intel Mac OS X 10_10_3',
    'Macintosh; Intel Mac OS X 10_11_5',
    'Windows NT 10.0; Win64; x64',
    'Windows NT 10.0; WOW64',
    'Windows NT 10.0; Win32; x86',
    'X11; Linux x86_64'
];

const FIREFOX_OS = [
    'Windows NT 10.0; Win64; x64;',
    'Macintosh; Intel Mac OS X 11.5;',
    'Macintosh; Intel Mac OS X 11.2;',
    'Macintosh; Intel Mac OS X 10.15;',
    'X11; Ubuntu; Linux x86_64;',
    'X11; Fedora; Linux x86_64;'
];


const randomUserAgent = ({ browser, minVersion, maxVersion } = {}) => {
    switch (browser) {
        case 'chrome':
            return __getChromeAgent(minVersion, maxVersion);
        case 'firefox':
            return __getFirefoxAgent(minVersion, maxVersion);
        default:
            return randomChoice(__getChromeAgent(minVersion, maxVersion), __getFirefoxAgent(minVersion, maxVersion));
    }
}


const __getChromeAgent = (minVersion = 87, maxVersion = 92) => {
    const versionDiff = maxVersion - minVersion + 1;

    return `Mozilla/5.0 (${CHROME_OS[Math.floor(Math.random() * CHROME_OS.length)]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * versionDiff) + minVersion
        }.0.${Math.floor(Math.random() * 190) + 4100}.${Math.floor(Math.random() * 50) + 140} Safari/537.36`;
}

const __getFirefoxAgent = (minVersion = 86, maxVersion = 91) => {
    const versionDiff = maxVersion - minVersion + 1;
    const firefoxVersion = Math.floor(Math.random() * versionDiff) + minVersion;

    return `Mozilla/5.0 (${FIREFOX_OS[Math.floor(Math.random() * FIREFOX_OS.length)]} rv:${firefoxVersion}.0) Gecko/20100101 Firefox/${firefoxVersion}.0`;
}

module.exports = {
    randomUserAgent
};
