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
import './css/navB.css'; // CSS
import './css/carousel.css'; // CSS
import './css/adds.css'; // CSS


/* GET PARTS DATA FROM WEB SERVER */
import sreq from './js/00_serverReq.js';
import devLogo from './image/devLogo.png';
/* GET VENDOR */
if (window.navigator.vendor != "") {
    console.log(window.navigator.vendor);
}
/* LOAD CUSTOM JS */
import './js/01_start.js'; // adjust user view
import './js/04_adds.js'; // Load images and set carousel options
import './js/03_carousel.js'; // JS
//import './js/02_navbar.js'; // JS
import pageFlick from './js/00_pageFlicking';

// GET PARTS FROM SERVER
sreq.getParts();

/*------------------------*/
/*  LOAD ALERT HTML       */
/*------------------------*/

$('body').append(require('./html/alerts.html'));


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
const loadCarousel = function(screenw) {
    if (screenw > 414) {
        return $('#P-0').append(require('./html/carousel.html'));
    }
};
loadCarousel(vpw);
/*  LOAD ADDS RAIL  */
$('#P-0').append(require('./html/adds.html'));
/*  NAV BOTTOM  */
$('body').append(require('./html/navBarBottom.html'));
/*  */
$('body').append(require('./html/bugForm.html'));


/* BUG REPORTING */
const URL = "http://34.242.179.249:8020/";
// var URL = 'http://172.16.0.104:8020/';
const sendBugReport = data => {
    $.ajax({
      url: URL,
      method: 'POST',
      origin: '*',
      contentType: 'text/plain',
      //headers: ({'Content-Type:','Access-Control-Allow-Origin':'*'}),
      data: JSON.stringify(data),
      dataType: 'text',
      timout: 10000,
      success: (response, status) => {
        console.log(response);
        console.log(status);
      },
      error: (err, xhr, third) => {
        console.log(err);
        console.log(xhr);
        console.log(third);
      }
    });
  };

const showAlerts = require('./js/14_alerts');
$('#bugBtn').on('click',()=>{
    $('#bugForm').modal('show');
    $('#rateBtns').on('click',(ev)=>{
        console.log(ev.target);
        console.log(ev.currentTarget);
        $(ev.currentTarget).children().each((i,el)=>{
            if($(el).hasClass('active')){
                $(el).removeClass('active');
            }
            $(ev.target).addClass('active');
        });
    });
    $('#sendBugReport').on('click',()=>{
        let rating = '';
        $('#rateBtns').children().each((i,el)=>{
            console.log(el);
            console.log($(el).hasClass('active'));
            if($(el).hasClass('active')){
                console.log($(el).html());
                rating = $(el).html();
            }
            if(rating == ''){
                rating = 'Not rated';
            }
        });
        var bugReport={
            email: $('#bugEmail').val(),
            txt1: $('#txt1').val(),
            txt2: $('#txt2').val(),
            rating: rating,
            type: 'bugReport'
        };
        console.log(bugReport);
        sendBugReport(bugReport);
        $('#bugForm').modal('hide');
        showAlerts('#bugThanks');
    });
    $('#bugReportCancel').on('click',()=>{
        $('#bugEmail').val(''),
        $('#txt1').val(''),
        $('#txt2').val(''),
        $('#rateBtns').children().each((i,el)=>{
            if($(el).hasClass('active')){
                $(el).removeClass('active');
            } 
        });
    });
});

/* LOAD LOADING SCREEN  */
window.onload = () => {
    setTimeout(() => {
        $('.se-pre-con').fadeOut();
    }, 2000);
};
//console.log('Index.loaded');