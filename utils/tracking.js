import generalUtils from "./general.js";

function getAsin(search) {
    const url = generalUtils.isValidUrl(search);
    if (url) {
        return url.pathname.split("dp/")[1].split("/")[0];
    } else {
        throw "Invalid url";
    }
}

export default {
    getAsin
};
