const fs = require('fs');
const { fork } = require('child_process');

const ConfigHelper = require('./ConfigHelper');

const LOGGER_ROUTINES_PATH = `${__dirname}/processes/LoggerRoutines`;

let __path;
let __debugFilename;
let __systemFilename;
let __today;

const __getFilePath = (filename) => {
    if (__today) {
        return `${__path}/${filename}_${__today}.log`;
    }

    return `${__path}/${filename}.log`
}

const setPath = (path) => {
    __path = path;
}

const setDebugFilename = (filename) => {
    __debugFilename = filename;
}

const setSystemFilename = (filename) => {
    __systemFilename = filename;
}

const startup = () => {
    return new Promise((resolve, reject) => {
        const child = fork(LOGGER_ROUTINES_PATH, [__path], { silent: true });

        child.on('error', (err) => {
            console.log(err);
        });

        child.on('message', (message) => {
            if (message.success) {
                __today = message.data.today;
                if (message.startup) resolve();
            } else {
                if (message.startup) reject(message.error);
                else throw message.error;
            }
        });
    });

}

const append = (filename, string, prefix, sync = false) => {
    if (!__path) throw "Path is required.";

    const date = new Date();
    const filepath = __getFilePath(filename);
    const message = `[${date.toISOString()}][${prefix}] ${string}\r\n`;
    if (sync) {
        fs.appendFileSync(filepath, message);
    } else {
        fs.appendFile(filepath, message, (err) => {
            if (err) throw err;
        });
    }
}

const logSystem = (string, prefix, sync = false) => {
    if (!__systemFilename) throw "System filename is required.";

    append(__systemFilename, string, prefix, sync);
}

const logDebug = (string, prefix, sync = false) => {
    if (!__debugFilename) throw "Debug filename is required.";

    if (ConfigHelper.get("enviroment") === "development")
        append(__debugFilename, string, prefix, sync);
}

const Logger = {
    setPath,
    startup,
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