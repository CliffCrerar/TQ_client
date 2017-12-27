var http = require('http');
var fs = require('fs');
var bootCss = require('./node_modules/bootstrap/dist/css/bootstrap.css');
var $ = require('./node_modules/jquery/dist/jquery.js');
var bootCss = require('./node_modules/bootstrap/dist/js/bootstrap.js');
var html = fs.readFileSync('index.html');

http
    .createServer(function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    })
    .listen(8080);

console.log('Node server running on 8080');