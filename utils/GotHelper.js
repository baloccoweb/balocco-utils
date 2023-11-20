import { HeadersHelper } from "./HeadersHelper.js";
import HttpsProxyAgent from "https-proxy-agent";
import { SocksProxyAgent } from "socks-proxy-agent";

export const GotHelper = {
    getDefaultOptions: (locale, agent, timeout = 5000, http2 = true) => {
        return {
            headers: HeadersHelper.getRealChrome(locale),
            throwHttpErrors: false,
            http2: http2 && (!agent || !!agent.http2),
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
};