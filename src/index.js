/*------------------------*/
/*       HOME PAGE        */
/*------------------------*/

/* App root file */
/* LODASH */
import _ from 'lodash';
/* BOOSTRAP 4 */
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
/* FONT AWESOME FOR WEB PACK */
import '../node_modules/font-awesome/css/font-awesome.css';
/* SLICK CAROUSEL API */
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick.js';
import '../node_modules/slick-carousel/slick/slick-theme.css';
/* CUSTOM CSS CSS */
import './css/landing.css';
import './css/font.css';
import './css/bg.css'; // define backgrounds
import './css/navT.css'; // CSS
/* GET PARTS DATA FROM WEB SERVER */
import './js/00_getParts.js';
import devLogo from './image/devLogo.png';
/* GET VENDOR */
if (window.navigator.vendor != "") {
    console.log(window.navigator.vendor);
}
/* LOAD CUSTOM JS */
import './js/01_start.js'; // adjust user view
import './js/02_navbar.js'; // JS
import pageFlick from './js/00_pageFlicking';

/*------------------------*/
/*  LOAD HOME PAGE HTML   */
/*------------------------*/

/*  LOAD NAVIATION BAR  */
const loadNav = (screenw) => {
    if (screenw <= 414) {
        return require('./html/navBarTopM.html');
    } else {
        return require('./html/navBarTopD.html');
    }
};


Promise.resolve($('body').append(loadNav(vpw)))
    .then((value) => {
        /* PAGE FLICK ACTION */
        if (vpw <= 414) {
            $('.navbar-nav>.nav-item').on('click', (ev) => {
                //console.log('nav click Mobile');
                pageFlick(ev);
                $('.navbar-collapse').collapse('toggle');
            });
        } else {
            $('#navTop>button').on('click', (ev) => {
                //console.log('nav click Desktop');
                pageFlick(ev);
            });
        }
    });

/*  IMPLEMENT NAV BAR OPERATION  
$('#navTop').on('click', (ev) => {
    const navop = require('./js/02_navbar');
    var navclick;
    //console.log(vpw);
    if (vpw <= 414) {
        navop.navBarOperationM(ev.currentTarget, ev.target);
    } else {
        //navop.navBarOperationD(ev.currentTarget, ev.target);
    }
});*/

/*  APPEND PAGE VIEW SECTION  */
$('body').append('<div id="pageCont" style="position:relative" class="pageCont"></div>');
$('#pageCont').append('<div id="P-0" class="lp"></div>');
/*  LOAD MAIN CAROUSEL  */
import './css/carousel.css'; // CSS
import './js/03_carousel.js'; // JS
const loadCarousel = function(screenw) {
    if (screenw > 414) {
        return $('#P-0').append(require('./html/carousel.html'));
    }
};
loadCarousel(vpw);
/*  LOAD ADDS RAIL  */
import './css/adds.css'; // CSS
import './js/04_adds.js'; // Load images and set carousel options
$('#P-0').append(require('./html/adds.html'));
/*  NAV BOTTOM  */
import './css/navB.css'; // CSS
import { inherits } from 'util';
$('body').append(require('./html/navBarBottom.html'));

/* LOAD LOADING SCREEN  */
window.onload = () => {
    setTimeout(() => {
        $('.se-pre-con').fadeOut();
    }, 2000);
};
//console.log('Index.loaded');