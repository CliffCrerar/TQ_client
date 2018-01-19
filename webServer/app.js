var http = require('http');
var BMW = require('./data/BMW_Parts.json');
var KTM = require('./data/KTM_Parts.json');
//var $ = require('jquery');

// procedure varialbes
let partsData = {};
let part;
let retPartData = {};

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

console.log('BMWCount: ', BMWcount);
console.log('KTMCount: ', KTMcount);

var totCount = 0;
for (var key in partsData) {
    totCount++;
}
console.log('totCount: ', totCount);

var IP = '172.16.0.152';
//var IP = '172.20.10.3';
var PORT = 8000;

http.createServer(function(req, res) {
    //var content = req.getHeader();
    console.log(req.url.substr(2));
    var catFilter = req.url.substr(2);
    console.log('--------------------------------------');
    for (var i in partsData) {

        if (catFilter == partsData[i].make) {
            retPartData[i] = partsData[i];
        }
    }
    console.log('--------------------------------------');
    console.log('--------------------------------------');
    console.log('--------------------------------------');
    console.log('--------------------------------------');
    console.log('--------------------------------------');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.write(JSON.stringify(retPartData));
    res.end();
}).listen(PORT, IP);

console.log('--------------------------------------');
console.log('# Server running at ' + IP + ':' + PORT);
console.log('--------------------------------------');