var BMW = require('./data/BMW_Parts.json');
var KTM = require('./data/KTM_Parts.json');
var LR = require('./data/LR_parts.json');
var HND = require('./data/HND_parts.json');
var YAM = require('./data/YAM_parts.json');

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
var LRcount = 0;
for (var key in LR) {
    LRcount++;
    partsData[key] = LR[key];
}
var HNDcount = 0;
for (var key in HND) {
    HNDcount++;
    partsData[key] = HND[key];
}
var YAMcount = 0;
for (var key in YAM) {
    YAMcount++;
    partsData[key] = YAM[key];
}
/*
var LRDIScount = 0;
for (var key in LRDIS) {
    LRDIScount++;
    partsData[key] = LRDIS[key];
}
This is some update that must be ignored
*/

console.log('BMWCount: ', BMWcount);
console.log('KTMCount: ', KTMcount);
//console.log('TBPcount: ', TBPcount);
console.log('LRcount:', LRcount);
console.log('HNDcount: ', HNDcount);
console.log('YAMcount:', YAMcount);


var totCount = 0;
for (var key in partsData) {
    totCount++;
}
console.log('totCount: ', totCount);

module.exports = partsData;