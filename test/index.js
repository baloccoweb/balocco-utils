const BaloccoUtils = require("../index");

console.log("SKU:", BaloccoUtils.getUnieuroUrlInfo("https://www.unieuro.it/online/Schede-grafiche/TUF-RTX3060-O12G-GAMING-pidASU90YV0GC0M0NA00").sku);
console.log("ASIN:", BaloccoUtils.getAmazonUrlInfo("https://www.amazon.it/AmazonBasics-Cavo-HDMI-High-Speed-Ethernet/dp/B003L1ZYYM").asin);
