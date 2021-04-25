const BaloccoUtils = require("../index");

console.log("AMD", BaloccoUtils.getAmdDefaultHeaders(['authority: www.amd.com']));
console.log("AMAZON", BaloccoUtils.getAmazonDefaultHeaders(['authority: www.amazon.it']));
console.log("UNIEURO", BaloccoUtils.getUnieuroDefaultHeaders(['authority: www.unieuro.it']));