const HeadersHelper = require("./HeadersHelper");
const HttpsProxyAgent = require("https-proxy-agent");
const { SocksProxyAgent } = require("socks-proxy-agent");

const GotHelper = {
    getDefaultOptions: (locale, agent, timeout = 5000) => {
        return {
            headers: HeadersHelper.getRealChrome(locale),
            throwHttpErrors: false,
            http2: !agent || !!agent.http2,
            timeout: { request: timeout },
            ...(agent ? { agent } : {})
        };
    },
    getAgent: (address) => {
        if (address.includes('socks')) {
            return {
                http: new SocksProxyAgent(address),
                https: new SocksProxyAgent(address)
            };
        } else if (address.includes("http")) {
            return {
                http: new HttpsProxyAgent(address),
                https: new HttpsProxyAgent(address)
            };
        }

        throw `Unhandled agent ${address}`;
    }
}

module.exports = GotHelper;