const fs = require('fs');
const os = require('os');

const ConfigHelper = require('./ConfigHelper');
const LoggerRoutines = require('./processes/LoggerRoutines');

const HOME_DIR = os.homedir();

const LOGS_PATH = 'logs';
const DEBUG_FILENAME = 'debug';
const SYSTEM_FILENAME = 'system';
const PROXY_FILENAME = 'proxy';
const SPAM_FILENAME = 'spam';
const NODES_FILENAME = 'nodes';
const FARMING_FILENAME = 'farming';

let __today;
let __folder;

const getFilePath = (filename) => {
    if (__today) {
        return `${getLogsFolder()}/${filename}_${__today}.log`;
    }

    return `${getLogsFolder()}/${filename}.log`;
}

const __append = (filename, string, prefix, sync = false) => {
    const date = new Date();
    const filepath = getFilePath(filename);
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

    if (!fs.existsSync(`${getLogsFolder()}`)) {
        fs.mkdirSync(`${getLogsFolder()}`, { recursive: true });
    }

    LoggerRoutines.execute(getLogsFolder(), (today) => {
        __today = today;
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

const logProxy = (string, prefix, sync = false) => {
    if (!__folder) throw "Run startup first";

    __append(PROXY_FILENAME, string, prefix, sync);
}

const logSpam = (string, prefix, sync = false) => {
    if (!__folder) throw "Run startup first";

    __append(SPAM_FILENAME, string, prefix, sync);
}

const logNodes = (string, prefix, sync = false) => {
    if (!__folder) throw "Run startup first";

    __append(NODES_FILENAME, string, prefix, sync);
}

const logFarming = (string, prefix, sync = false) => {
    if (!__folder) throw "Run startup first";

    __append(NODES_FILENAME, string, prefix, sync);
}

const Logger = {
    startup,
    getLogsFolder,
    system: {
        log: logSystem,
        getFilePath: () => getFilePath(SYSTEM_FILENAME)
    },
    debug: {
        log: logDebug,
        getFilePath: () => getFilePath(DEBUG_FILENAME)
    },
    proxy: {
        log: logProxy,
        getFilePath: () => getFilePath(PROXY_FILENAME)
    },
    spam: {
        log: logSpam,
        getFilePath: () => getFilePath(SPAM_FILENAME)
    },
    nodes: {
        log: logNodes,
        getFilePath: () => getFilePath(NODES_FILENAME)
    },
    farming: {
        log: logFarming,
        getFilePath: () => getFilePath(FARMING_FILENAME)
    },
}

module.exports = Logger;