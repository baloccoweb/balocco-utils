const fs = require('fs');
const ConfigHelper = require('./ConfigHelper');

let __path;
let __debugFilename;
let __systemFilename;

const setPath = (path) => {
    __path = path;
}

const setDebugFilename = (filename) => {
    __debugFilename = filename;
}

const setSystemFilename = (filename) => {
    __systemFilename = filename;
}

const append = (filename, string, sync = false) => {
    if (!__path) throw "Path is required.";

    const date = new Date();
    const filepath = `${__path}/${filename}.log`;
    const message = `[${date.toISOString()}] ${string}\r\n`;
    if (sync) {
        fs.appendFileSync(filepath, message);
    } else {
        fs.appendFile(filepath, message, (err) => {
            if (err) throw err;
        });
    }
}

const logSystem = (string, sync = false) => {
    if (!__systemFilename) throw "System filename is required.";

    append(__systemFilename, string, sync);
}

const logDebug = (string, sync = false) => {
    if (!__debugFilename) throw "Debug filename is required.";

    if (ConfigHelper.get("enviroment") === "development")
        append(__debugFilename, string, sync);
}

const Logger = {
    setPath,
    system: {
        setFilename: setSystemFilename,
        log: logSystem
    },
    debug: {
        setFilename: setDebugFilename,
        log: logDebug
    }
}

module.exports = Logger;