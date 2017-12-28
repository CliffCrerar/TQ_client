import _ from 'lodash';

//Load CSS
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/landing.css';

//Custom JS
import './js/landing.js'

//libs & nodes
import 'bootstrap';
import http from 'http';
import fs from 'fs';

//constants 
const hostName = '127.0.0.1';
const port = '3000';
const index = fs.readFileSync("../dist/index.html");

http.createServer((req, res) => {
    console.log(req);
    console.log(req.headers);
    console.log(req.socket());
});