console.log('Starting web server');

var hostIP = '127.0.0.1';
var port = '8080';

var http = require('http');
var fs = require('fs');

var html = fs.readFileSync('index.html');

http.createServer(function(req, res) {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.end(html);

}).listen(port, hostIP);

console.log('Node server running on socket ' + hostIP + ':' + port);

console.log('Hosting Bootstrap Document Library')

var bootstrapDocs = fs.readFileSync('ftp/bootstrap/index.html')

var bsCocsPort = 8085

http.createServer(function(req, res) {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.end(a);
}).listen(bootstrapDocs, hostIP);;

console.log('Hosting Bootstrap docs on socket ' + hostIP + ':' + port);