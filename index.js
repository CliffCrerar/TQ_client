var http = require('http');
var fs = require('fs');

var html = fs.readFileSync('index.html');

var hostIP = '127.0.0.1'
var port = '4000';

var Client = require('ftp');
var $;

var ftp = new Client();
var connectionProperties = {
    host: "127.0.0.1",
    port: 22
}
console.log('Running FTP')
ftp.on('ready', function() {
    ftp.get('jquery/dist/jquery.js', function(err, stream) {
        if (err) throw err;
        stream.once('close', function() { ftp.end(); });
    });
});
ftp.connect(connectionProperties);

console.log('Starting web server');
http.createServer(function(req, res) {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.end(html);
}).listen(port, hostIP);

console.log('Node server running on socket ' + hostIP + ':' + port);