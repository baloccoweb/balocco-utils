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

const randomChoice = (choice1, choice2) => {
    return (Math.round(Math.random()) ? choice1 : choice2);
}

const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandom = (arr, n) => {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
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
    getLocale,
    getAppVersion,
    randomChoice,
    randomIntFromInterval,
    getRandom
}
