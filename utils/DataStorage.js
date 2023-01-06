const fs = require('fs');
const os = require('os');
const { dirname } = require('path');

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

const saveJson = (filename, data, createDir = false) => {
    return new Promise((resolve, reject) => {
        __checkFolder();

        const path = `${getDataFolder()}/${filename}.json`;
        const write = () => {
            fs.writeFile(path, JSON.stringify(data), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }

        if (createDir) {
            fs.mkdir(dirname(path), { recursive: true }, function (err) {
                if (err) return reject(err);

                write();
            });
        } else {
            write();
        }
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

const mkdir = (folder) => {
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

const rm = (folder) => {
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

const rmJson = (filname) => {
    return new Promise((resolve, reject) => {
        fs.rm(`${getDataFolder()}/${filname}.json`, {
            recursive: false,
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
    rm,
    rmJson
}

module.exports = DataStorage;