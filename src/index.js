/* App root file */
console.log('Loading files');
import _ from 'lodash';

//Load CSS
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/landing.css';
import './css/nav.css';
require('font-awesome-webpack');


//Custom JS
import './js/landing.js';
import './js/nav.js';
import './js/dispTextLoader.js';

//libs & nodes
import 'bootstrap';

//constants 
const hostName = '127.0.0.1';
const port = '3000';
/*
http.createServer((req, res) => {
    console.log(req);
    console.log(req.headers);
    console.log(req.socket());
});
*/
console.log('Index.loaded');