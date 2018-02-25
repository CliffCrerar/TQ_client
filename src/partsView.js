/*------------------------*/
/*  PARTS CATELOGUE PAGE  */
/*------------------------*/

/* IMPORT CSS */
import './css/partsViewFP.css';
import './css/partsView.css';
/* BOOSTRAP 4 */
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
/* FONT AWESOME FOR WEB PACK */
import 'font-awesome-webpack';
/* CALL PART VIEW POPULATE FUNCTION */
const loadPartList = require('./js/06_pvMainLoad_D');
const loadButtons = require('./js/08_pvMainFilter_D');

/* LOAD PARTS VIEW FRONT PAGE */
$('#pageCont').append(require('./html/partsViewFP.html'));
/* POPULATE BADGE BUTTONS ATTRIBUTES INTO HTML */
const badge = require('./js/05_badges');
$.each(badge, (make, img) => {
    $('#' + make.toUpperCase() + '>img').attr('src', img);
});
/* LOAD PARTS VIEW CONTAINTER */
$('#P_1').append(require('./html/partsViewCont.html'));
/* CLICK FUNCTION FOR PARTSVIEW FRONT PAGE */
$('.badgeBtn').on('click', (ev) => {
    //console.log(ev);
    $('#partsViewFP').hide();
    $('#partsViewContainer').fadeIn();
    //console.log(ev.target.id);
    loadPartList(ev);
    loadButtons(ev);
});

/* LOAD PART FILTER BUTTONS */




/**************************************/

/*------------------------*/
/*      PAGE EVENTS       */
/*------------------------*/

/* SET NO HOVER FOR PARTS LIST HEADER */
$(document).on({
    mouseenter: function(eve) {
        //stuff to do on mouse enter
        $('#' + eve.target.id + '>.row>.pClick').removeClass('invisible');
    },
    mouseleave: function(evl) {
        //stuff to do on mouse leave
        $('#' + evl.target.id + '>.row>.pClick').addClass('invisible');
    }
}, '.list-group-item-action');


/********************************/
console.log('Partscat.loaded');