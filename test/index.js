const BaloccoUtils = require("../index");

//BaloccoUtils.AppStorage.startup(".utils");
//BaloccoUtils.AppStorage.writeContent("pippo/aaa.txt", "gigi");
//console.log(BaloccoUtils.AppStorage.getContent("pippo/aaa.txt"))
//BaloccoUtils.DataStorage.startup(".utils");
//BaloccoUtils.DataStorage.save("test", { ok: true });
BaloccoUtils.Logger.startup(".utils");
BaloccoUtils.Logger.system.log('okkkk');
console.log(BaloccoUtils.Logger.getLogsFolder());
//console.log("AMD headers:", BaloccoUtils.getAmazonDefaultHeaders());
//console.log("SKU:", BaloccoUtils.getUnieuroUrlInfo("https://www.unieuro.it/online/Schede-grafiche/TUF-RTX3060-O12G-GAMING-pidASU90YV0GC0M0NA00").sku);
//console.log("ASIN:", BaloccoUtils.getAmazonUrlInfo("https://www.amazon.it/AmazonBasics-Cavo-HDMI-High-Speed-Ethernet/dp/B003L1ZYYM").asin);