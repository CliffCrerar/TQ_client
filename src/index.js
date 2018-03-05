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
import 'font-awesome-webpack';
/* SLICK CAROUSEL API */
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick.js';
import '../node_modules/slick-carousel/slick/slick-theme.css';
/* CUSTOM CSS CSS */
import './css/landing.css';
import './css/font.css';
/* GET PARTS DATA FROM WEB SERVER */
import './js/00_getParts.js';
import devLogo from './image/devLogo.png';

/* GET VENDOR */
if (window.navigator.vendor != "") {
    console.log(window.navigator.vendor);
}

/*------------------------*/
/*  LOAD HOME PAGE HTML   */
/*------------------------*/

/*  LOAD CSS  */
import './css/bg.css'; // define backgrounds
import './css/navT.css'; // CSS
/*  LOAD NAVIATION BAR  */
import './js/01_start.js'; // adjust user view
import './js/02_navbar.js'; // JS
const loadNav = (screenw) => {
    if (screenw <= 414) {
        return require('./html/navBarTopM.html');
    } else {
        return require('./html/navBarTopD.html');
    }
};
/* PAGE NAVIGATION ACTIONS */
Promise.resolve($('body').append(loadNav(vpw)))
    .then(() => {
        // THIS IS FOR SPECIAL NAVBAR OPERATIONS DESKTOP & MOBILE
        $('#N-0').on('click', (ev) => {
            console.log('HOME BUTTON');
            if ($('#N-1').hasClass('active')) {
                $('#P-1').fadeOut();
            }
            if ($('#N-2').hasClass('active')) {
                $('#P-2').fadeOut();
            }
            $('#P-0').fadeIn();
            $('#accordion').empty();
            $('#left').empty();
            $('#partsViewContainerM').empty();
            $('#filterDropDownM').remove();
            $('#partsViewContainer').css('display', 'none');
            $('#partsViewContainerM').css('display', 'none');
            $('#partsViewFP').css('display', 'none');

        });
        $('#N-1').on('click', (ev) => {
            console.log('PARTS CAT BUTTON');
            //require('./js/00_resetViews');
            $('#P-1').fadeIn();
            $('#partsViewFP').css('display', 'inherit');
            $('#partsViewContainer').css('display', 'none');
            $('#partsViewContainerM').css('display', 'none');
            if ($('#N-0').hasClass('active')) {
                $('#P-0').fadeOut();
            }
            if ($('#N-2').hasClass('active')) {
                $('#P-2').fadeOut();
            }
            $('#accordion').empty();
            $('#left').empty();
            $('#partsViewContainerM').empty();
            $('#filterDropDownM').remove();
        });
        $('#N-2').on('click', (ev) => {
            console.log('CONTACTS BUTTON');
            //require('./js/00_resetViews');
            if ($('#N-0').hasClass('active')) {
                $('#P-0').fadeOut();
            }
            if ($('#N-1').hasClass('active')) {
                $('#P-1').fadeOut();
            }
            $('#accordion').empty();
            $('#left').empty();
            $('#partsViewContainerM').empty();
            $('#filterDropDownM').remove();
            $('#P-2').fadeIn();
            $('#partsViewContainer').css('display', 'none');
            $('#partsViewContainerM').css('display', 'none');
            $('#partsViewFP').css('display', 'none');
            $('#navBottom').empty();
            Promise.resolve($('#navBottom').append(require('./html/navBarBottomAbout.html')))
                .then(() => {
                    console.log(devLogo);
                    $('#devLogo').attr('src', devLogo);
                });
        });
        // FOR MOBILE
        $('.navbar-toggler').click((ev) => {
            if ($('#navbarSupportedContent').hasClass('show')) {
                $('#navbarSupportedContent').removeClass('show');
            }
        });
    });
/*  IMPLEMENT NAV BAR OPERATION  */
$('#navTop').on('click', (ev) => {
    const navop = require('./js/02_navbar');
    var navclick;
    //console.log(vpw);
    if (vpw <= 414) {
        navop.navBarOperationM(ev.currentTarget, ev.target);
    } else {
        navop.navBarOperationD(ev.currentTarget, ev.target);
    }
});
/* APPEND PAGE VIEW SECTION */
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
if (vpw <= 414) { $('.social').remove(); }


/* LOAD LOADING SCREEN  */
window.onload = () => {
    setTimeout(() => {
        $('.se-pre-con').fadeOut();
    }, 2000);
};
//console.log('Index.loaded');