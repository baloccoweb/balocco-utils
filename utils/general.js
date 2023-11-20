import crypto from "crypto";
import { ConfigHelper } from "./ConfigHelper.js";

export const sanitazeString = (str) => {
    return str.replace(/[^0-9a-z]/gi, '')
        .trim()
        .toUpperCase();
}

export const cleanString = (str) => {
    return str.replace(/(\r\n|\n|\r)/gm, '')
        .trim();
}

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getCurrency = (str) => {
    return str.replace(/[\d\., ]/g, '')
        .trim();
}

export const getPriceValue = (str) => {
    let value = Number(sanitazeString((str))) / 100;

    if (isNaN(value)) {
        value = null;
    }

    return value;
}

export const isValidUrl = (url) => {
    try {
        return (new URL(url));
    } catch (err) {
        return false;
    }
}

export const priceToNumber = (str) => {
    const cleanStr = cleanString(str);
    return Number(cleanStr.replace(/[^0-9.-]+/g, "")) / 100;
};

export const generateId = () => {
    return crypto.randomBytes(16).toString("hex");
}

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const stringIncludesAllWords = (str, words = []) => {
    let allWordsIncluded = true;

    words.forEach((word) => {
        if (!str.includes(word)) allWordsIncluded = false;
    });

    return allWordsIncluded;
}

export const getLocale = () => {
    return ConfigHelper.get("locale") ? ConfigHelper.get("locale") : "it-IT";
}

export const getAppVersion = () => {
    return process.env.npm_package_version;
}

export const randomChoice = (choice1, choice2) => {
    return (Math.round(Math.random()) ? choice1 : choice2);
}

export const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandom = (arr, n) => {
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

export const slice2 = (array, chunk, offset) => {
    let subarray = [];
    let ind;

    if (chunk > array.length) {
        subarray = [...array];
        ind = 0;
    } else if (chunk === 1) {
        ind = offset + chunk;
        if (ind >= array.length) ind = 0;

        subarray = array.slice(offset, ind);
    } else {
        for (let i = 0; i < chunk; i++) {
            ind = (offset + i) % array.length;
            subarray.push(array[ind]);
        }
    }

    return {
        subarray,
        ind
    };
}

export const localeToLcidName = (locale) => {
    if (["en-US", "en-GB"].includes(locale)) return locale;

    return `${locale}-${locale.toUpperCase()}`;
}
