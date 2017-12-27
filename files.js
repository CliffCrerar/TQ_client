console.log('Running FTP')

var Client = require('ftp');
var fs = require('fs');
var $;

var ftp = new Client();
var connectionProperties = {
    host: "127.0.0.1",
    port: 22
}

ftp.on('ready', function(event) {
    ftp.get('jquery/dist/jquery.js', function(err, stream) {
        //console.log(err);
        var readstream = fs.createReadStream('ftp/jquery/dist/jquery.js')
        console.log(stream);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(readstream);
        readstream.on('open', function() {
                console.log('The file is now open')
            })
            //console.log(event);
    });
});
ftp.connect(connectionProperties);