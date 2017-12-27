var FtpSrv = require('ftp-srv')

var host = '127.0.0.1';
var port = '22';

var ftpServer = new FtpSrv('ftp://' + host + ':' + port, { anonymouse: true, greetings: ['ftp online'] });

ftpServer.on('login', function(data, resolve, reject) {
    console.log(data);
    resolve({ root: 'ftp/' });
    //console.log(reject);
})

ftpServer.listen().then(function() {
    console.log('Ftp server running on socket ' + host + ':' + port);
});