var http = require('http');
var fs = require('fs');

var html = fs.readFileSync('index.html');

console.log('File Server Running');

http.createServer(function(req, res) {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.end(html);
}).listen(8080, '127.0.0.1');

console.log('Node server running on 8080');