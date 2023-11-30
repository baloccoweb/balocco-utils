const { socksDispatcher } = require('fetch-socks');
const { fetch, ProxyAgent, Agent } = require('undici');

const getAgent = (timeout, proxy = null) => {
    if (proxy) {
        if (proxy.includes("http")) {
            return new ProxyAgent(proxy);
        }

        const proxyUrl = new URL(proxy);
        const type = proxyUrl.protocol.charAt(proxyUrl.protocol.length - 2);
        const [host, port] = proxyUrl.host.split(":");

        const dispatcher = socksDispatcher([{
            type: Number(type),
            host,
            port: Number(port)
        }], {
            connect: {
                timeout,
                // set some TLS options
                rejectUnauthorized: false,
            },
        });

        return dispatcher;
    }

    return new Agent({
        headersTimeout: timeout,
        connectTimeout: timeout,
        bodyTimeout: timeout
    });
}

const req = async (url, {
    method = "GET",
    headers = undefined,
    timeout = 5000,
    body = undefined,
    proxy = undefined
} = {
        method: "GET",
        timeout: 5000
    }) => {
    return await fetch(url, {
        headers,
        method,
        body,
        dispatcher: getAgent(timeout, proxy)
    });
}

const BaloccoFetch = {
    req
};

module.exports = BaloccoFetch;