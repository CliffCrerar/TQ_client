var Client = require('ftp');

var c = new Client();

var connectionProperties = {
    host: "127.0.0.1",
    port: 22,
    user: "myuser",
    password: "mypwd"
}
c.on('ready', function() {
    c.list(function(err, list) {
        if (err) throw err;
        console.dir(list);
        c.end();
    });
});
c.connect(connectionProperties);