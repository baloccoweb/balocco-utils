const fs = require('fs');
const os = require('os');
const path = require('path');

const HOME_DIR = os.homedir();
const APP_PATH = 'storage/app';

let __folder;

const __checkFolder = () => {
    if (!__folder) {
        throw "Run startup first.";
    }
}

const getAppFolder = () => {
    __checkFolder();

    return `${HOME_DIR}/${__folder}/${APP_PATH}`;
}

const startup = (folder) => {
    if (!folder) throw "Pass valid folder name";

    __folder = folder;

    if (!fs.existsSync(`${getAppFolder()}`)) {
        fs.mkdirSync(`${getAppFolder()}`, { recursive: true });
    }
}

const writeContent = (filepath, data) => {
    __checkFolder();

    if (!fs.existsSync(`${getAppFolder()}/${path.dirname(filepath)}`)) {
        fs.mkdirSync(`${getAppFolder()}/${path.dirname(filepath)}`, { recursive: true });
    }

    fs.writeFile(`${getAppFolder()}/${filepath}`, data, (err) => {
        if (err) throw err;
    });
}

const getContent = (filepath) => {
    __checkFolder();
    try {
        const rawdata = fs.readFileSync(`${getAppFolder()}/${filepath}`);

        return rawdata;
    } catch (e) {
        return null;
    }
}

const AppStorage = {
    getAppFolder,
    startup,
    writeContent,
    getContent
}

module.exports = AppStorage;