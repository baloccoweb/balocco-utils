const crypto = require("crypto");
const ConfigHelper = require("./ConfigHelper");

const sanitazeString = (str) => {
    return str.replace(/[^0-9a-z]/gi, '')
        .trim()
        .toUpperCase();
}

const cleanString = (str) => {
    return str.replace(/(\r\n|\n|\r)/gm, '')
        .trim();
}

const getCurrency = (str) => {
    return str.replace(/[\d\., ]/g, '')
        .trim();
}

const getPriceValue = (str) => {
    let value = Number(sanitazeString((str))) / 100;

    if (isNaN(value)) {
        value = null;
    }

    return value;
}

const isValidUrl = (url) => {
    try {
        return (new URL(url));
    } catch (err) {
        return false;
    }
}

const priceToNumber = (str) => {
    const cleanStr = cleanString(str);
    return Number(cleanStr.replace(/[^0-9.-]+/g, "")) / 100;
};

const generateId = () => {
    return crypto.randomBytes(16).toString("hex");
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const stringIncludesAllWords = (str, words = []) => {
    let allWordsIncluded = true;

    words.forEach((word) => {
        if (!str.includes(word)) allWordsIncluded = false;
    });

    return allWordsIncluded;
}

const getLocale = () => {
    return ConfigHelper.get("locale") ? ConfigHelper.get("locale") : "it-IT";
}

const getAppVersion = () => {
    return process.env.npm_package_version;
}

/**
 * Gets random chrome User Agent
 * (Remember to update)
 * 
 * @returns string (User Agent)
 */
const getRandomUserAgent = () => {
    const os = [
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
        'Windows NT 10.0',
        'X11; Linux x86_64'
    ];

    return `Mozilla/5.0 (${os[Math.floor(Math.random() * os.length)]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 5) + 85
        }.0.${Math.floor(Math.random() * 190) + 4100}.${Math.floor(Math.random() * 50) + 140} Safari/537.36`;
}

const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    sanitazeString,
    cleanString,
    getCurrency,
    getPriceValue,
    isValidUrl,
    priceToNumber,
    generateId,
    sleep,
    stringIncludesAllWords,
    getRandomUserAgent,
    getLocale,
    getAppVersion,
    randomIntFromInterval
}
