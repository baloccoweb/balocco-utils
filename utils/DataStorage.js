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

const save = (filename, data) => {
    __checkFolder();

    fs.writeFile(`${getDataFolder()}/${filename}.json`, JSON.stringify(data), (err) => {
        if (err) throw err;
    });
}

const get = (filename) => {
    __checkFolder();

    try {
        const rawdata = fs.readFileSync(`${getDataFolder()}/${filename}.json`);

        return JSON.parse(rawdata);
    } catch (e) {
        return [];
    }
}

const DataStorage = {
    getDataFolder,
    startup,
    save,
    get
}

module.exports = DataStorage;