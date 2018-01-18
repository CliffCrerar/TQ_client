var http = require('http');
var BMW = require('./data/BMW_Parts.json');
var KTM = require('./data/KTM_Parts.json');
//var $ = require('jquery');

//Combine parts data into 1 object
let partsData = {};
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

console.log('BMWCount: ', BMWcount);
console.log('KTMCount: ', KTMcount);

var totCount = 0;
for (var key in partsData) {
    totCount++;
}
console.log('totCount: ', totCount);

for (var key1 in partsData) {
    var part = partsData[key1];
    console.log(part);
    for (var key2 in part) {

        console.log(part[key2]);
    }
}
//console.log(partsData);
//var IP = '127.0.0.1';


var IP = '172.16.0.152';
var PORT = 8000;

http.createServer(function(req, res) {
    //var content = req.getHeader();
    //console.log(req);
    console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(JSON.stringify(partsData));
    res.end();
}).listen(PORT, IP);

console.log('--------------------------------------');
console.log('# Server running at ' + IP + ':' + PORT);
console.log('--------------------------------------');