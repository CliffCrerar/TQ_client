var BMW = require('./data/BMW_Parts.json');
var KTM = require('./data/KTM_Parts.json');
var TBP = require('./data/TopBox_Panniers.json');
var LRDEF = require('./data/LRDef_parts.json');
var LRDIS = require('./data/LRDisc_parts.json');
var HND = require('./data/HND_parts.json');

// procedure varialbes
var partsData = {};

//Combine parts data into 1 object
var BMWcount = 0;
for (var key in BMW) {
    BMWcount++;
    partsData[key] = BMW[key];
}
var KTMcount = 0;
for (var key in KTM) {
    KTMcount++;
    partsData[key] = KTM[key];
}
var TBPcount = 0;
for (var key in TBP) {
    TBPcount++;
    partsData[key] = TBP[key];
}
var LRDEFcount = 0;
for (var key in LRDEF) {
    LRDEFcount++;
    partsData[key] = LRDEF[key];
}
var LRDIScount = 0;
for (var key in LRDIS) {
    LRDIScount++;
    partsData[key] = LRDIS[key];
}
var HNDcount = 0;
for (var key in HND) {
    HNDcount++;
    partsData[key] = HND[key];
}

console.log('BMWCount: ', BMWcount);
console.log('KTMCount: ', KTMcount);
console.log('TBPcount: ', TBPcount);
console.log('LRDEFcount:', LRDEFcount);
console.log('LRDIScount:', LRDIScount);
console.log('HNDcount: ', HNDcount);

var totCount = 0;
for (var key in partsData) {
    totCount++;
}
console.log('totCount: ', totCount);

module.exports = partsData;