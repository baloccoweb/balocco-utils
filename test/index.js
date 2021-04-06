const BaloccoUtils = require("../index");

//BaloccoUtils.Logger.setPath(__dirname + '/q')
//BaloccoUtils.Logger.system.setFilename('gianni');
BaloccoUtils.Logger.startup(".utils").then(response => {
    console.log(BaloccoUtils.Logger.getLogsFolder());
    BaloccoUtils.Logger.system.log('okkkk');
}).catch(err => console.log(err));
//console.log("AMD headers:", BaloccoUtils.getAmazonDefaultHeaders());
//console.log("SKU:", BaloccoUtils.getUnieuroUrlInfo("https://www.unieuro.it/online/Schede-grafiche/TUF-RTX3060-O12G-GAMING-pidASU90YV0GC0M0NA00").sku);
//console.log("ASIN:", BaloccoUtils.getAmazonUrlInfo("https://www.amazon.it/AmazonBasics-Cavo-HDMI-High-Speed-Ethernet/dp/B003L1ZYYM").asin);
