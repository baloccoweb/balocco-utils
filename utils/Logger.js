const fs = require('fs');
const { fork } = require('child_process');
const os = require('os');

const ConfigHelper = require('./ConfigHelper');

const LOGGER_ROUTINES_PATH = `${__dirname}/processes/LoggerRoutines`;
const HOME_DIR = os.homedir();

const LOGS_PATH = 'storage/logs';
const DEBUG_FILENAME = 'debug';
const SYSTEM_FILENAME = 'system';

let __today;
let __folder;

const __getFilePath = (filename) => {
    if (__today) {
        return `${getLogsFolder()}/${filename}_${__today}.log`;
    }

    return `${getLogsFolder()}/${filename}.log`;
}

const __append = (filename, string, prefix, sync = false) => {
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

const getLogsFolder = () => {
    if (!__folder) throw "Run startup first";

    return `${HOME_DIR}/${__folder}/${LOGS_PATH}`;
}

const startup = (folder) => {
    if (!folder) throw "Pass valid folder name";

    __folder = folder;

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(`${getLogsFolder()}`)) {
            fs.mkdirSync(`${getLogsFolder()}`, { recursive: true });
        }

        const child = fork(LOGGER_ROUTINES_PATH, [`${getLogsFolder()}`], { silent: true });

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

const logSystem = (string, prefix, sync = false) => {
    if (!__folder) throw "Run startup first";

    __append(SYSTEM_FILENAME, string, prefix, sync);
}

const logDebug = (string, prefix, sync = false) => {
    if (!__folder) throw "Run startup first";

    if (ConfigHelper.get("enviroment") === "development")
        __append(DEBUG_FILENAME, string, prefix, sync);
}

const Logger = {
    startup,
    getLogsFolder,
    system: {
        log: logSystem
    },
    debug: {
        log: logDebug
    }
}

module.exports = Logger;