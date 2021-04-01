const fs = require('fs');

let __path;

const setPath = (path) => {
    __path = path;
}

const save = (filename, data) => {
    __checkPath();

    fs.writeFile(`${__path}/${filename}.json`, JSON.stringify(data), (err) => {
        if (err) throw err;
    });
}

const get = (filename) => {
    __checkPath();

    try {
        const rawdata = fs.readFileSync(`${__path}/${filename}.json`);

        return JSON.parse(rawdata);
    } catch (e) {
        return [];
    }
}

const __checkPath = () => {
    if (!__path) {
        throw "Path is required.";
    }
}

const DataStorage = {
    setPath,
    save,
    get
}

module.exports = DataStorage;