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
        return config.get(key);
    }
})();

module.exports = ConfigHelper;
