const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const IP = '172.16.0.104';
const PORT = 5500;

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(PORT, IP, function() {
    console.log('------------------------------------');
    console.log('Example app listening on port+PORT+"!\n');
    console.log('------------------------------------');

});