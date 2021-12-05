const fs = require('fs');
const os = require('os');

const HOME_DIR = os.homedir();
const DATA_PATH = 'data';

let __folder;

const __checkFolder = () => {
    if (!__folder) {
        throw "Run startup first.";
    }
}

const getDataFolder = () => {
    __checkFolder();

    return `${HOME_DIR}/${__folder}/${DATA_PATH}`;
}

const startup = (folder) => {
    if (!folder) throw "Pass valid folder name";

    __folder = folder;

    if (!fs.existsSync(`${getDataFolder()}`)) {
        fs.mkdirSync(`${getDataFolder()}`, { recursive: true });
    }
}

const saveJson = (filename, data) => {
    return new Promise((resolve, reject) => {
        __checkFolder();

        fs.writeFile(`${getDataFolder()}/${filename}.json`, JSON.stringify(data), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

const getJson = (filename) => {
    __checkFolder();

    try {
        const rawdata = fs.readFileSync(`${getDataFolder()}/${filename}.json`);

        return JSON.parse(rawdata);
    } catch (e) {
        return null;
    }
}

const mkdir = async (folder) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${getDataFolder()}/${folder}`, {
            recursive: true
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}

const rm = async (folder) => {
    return new Promise((resolve, reject) => {
        fs.rm(`${getDataFolder()}/${folder}`, {
            recursive: true,
            force: true
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}

const DataStorage = {
    getDataFolder,
    startup,
    saveJson,
    getJson,
    mkdir,
    rm
}

module.exports = DataStorage;