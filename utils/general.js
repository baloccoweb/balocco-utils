const UserAgent = require("user-agents");
const crypto = require("crypto");

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

const getRandomUserAgent = () => {
    const userAgent = new UserAgent([
        /Chrome\/([8-9][0-9]|\d{3,})/,
        {
            deviceCategory: "desktop",
            platform: 'Win32',

        }
    ]);

    return userAgent.toString();
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
    getRandomUserAgent
}
