/* App root file */
import $ from 'jquery';
// Lodash
import _ from 'lodash';
// handleBars

// Load CSS
import './css/landing.css';
import './css/navT.css';
import './css/font.css';
import './css/carousel.css';
import './css/adds.css';
import './css/navB.css';
import './css/bg.css';
import './css/catFrontPage.css';
import './css/partsView.css';
import './css/contactView.css'
// Custom JS
import './js/01_start.js';
import './js/02_functions.js';
//  import './js/03_events.js';
import './js/04_docReady.js';
import './js/carousel.js';
import './js/adds.js';
import './html/LoadHTML.js';
// Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
// Font Awesome
import 'font-awesome-webpack';
// Slick.carousel
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick.js';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import { setTimeout } from 'timers';
// PartData

//Nav bar click
var n = require('./js/02_functions.js');
var navOps = new n();
var html = require('./html/LoadHTML.js');
var load = new html();
console.log(load);
/* Events */
$('#navTop').on('click', (ev) => {
    console.log('click');
    //Navbar click function
    var brandName = $(ev.target).hasClass('navbar-brand');
    if (window.vpw <= 414 && !brandName) {
        navOps.navBarOperationM(ev.currentTarget, ev.target);
    } else if (!brandName) {
        navOps.navBarOperationD(ev.currentTarget, ev.target);
    }

    load.partsViewShow(ev);
    load.contactViewShow(ev);
    /* Load catFrontPage
    if (ev.target.id == 'N_1') {
        load.catFpBadge();
    } else {
        $('#catFP').fadeOut();
    }
    */
});

//<Testing data request>

$('#reqButton').on('click', function(ev) {
    console.log('request click')
    $('.tempResp').append('<p>Click</p>');
});

//</Testing data request>

console.log('Index.loaded');