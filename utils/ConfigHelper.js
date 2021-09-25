const config = require('config');

const ConfigHelper = new (class {
    constructor() {
        this._overrides = {};
    }

    set(key, value) {
        this._overrides[key] = value;
    }

    get(key) {
        if (this._overrides[key]) return this._overrides[key];

        try {
            return config.get(key);
        } catch (e) {
            return null;
        }
    }

    isDev() {
        return this.get("enviroment") === "development";
    }

    isProd() {
        return this.get("enviroment") === "production";
    }
})();

module.exports = ConfigHelper;
