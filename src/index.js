/* App root file */
// Lodash
// Set global variables
window.vph = screen.height;
window.vpw = screen.width;
console.log("SCR_W: ", vph, "SCR_H: ", vpw);

import _ from 'lodash';

// Load CSS
import './css/landing.css';
import './css/navT.css';
import './css/font.css';
import './css/carousel.css';
//import './css/adds.css';
//import './css/navB.css';
//import './css/bg.css';
//import './css/partsViewFP.css';
//import './css/partsView.css';
//import './css/contactView.css';
// Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.css';
//import 'jquery';
//import 'bootstrap';
// Font Awesome
import 'font-awesome-webpack';
// Slick.carousel
//import '../node_modules/slick-carousel/slick/slick.css';
//import '../node_modules/slick-carousel/slick/slick.js';
//import '../node_modules/slick-carousel/slick/slick-theme.css';
// PartData

// Custom JS for starting/landing/home page
//import './js/00_getParts.js';
import './js/01_start.js';
//import './js/02_navbar.js';
//import './js/03_carousel.js';
//import './js/04_adds.js';

// landing homepage HTML
const loadNav = function(screenw) {
    if (screenw <= 414) {
        return require('./html/navBarTopM.html');
    } else {
        return require('./html/navBarTopD.html');
    }
};
$('body').append(loadNav(vpw));
//$('body').append('<div class="se-pre-con"></div>');
console.log('Index.loaded');

// Nav bar click
// var N = require('./js/02_navbar.js');
// var navOps = new N();
// var Html = require('./html/LoadHTML.js');
// var load = new Html();
/* Events */

// Loading screen scripts
window.onload = () => {
    setTimeout(() => {
        $('.se-pre-con').fadeOut();
    }, 500);
};