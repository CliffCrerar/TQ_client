/*------------------------*/
/*  PARTS CATELOGUE PAGE  */
/*------------------------*/

/* IMPORT CSS */
import './css/partsViewFP.css';
import './css/partsView.css';
/* BOOSTRAP 4 */
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
/* LOAD HTML */
$('#pageCont').append(require('./html/partsViewFP.html'));
$('#P_1').append(require('./html/partsView.html'));
/* LOAD BADGE SRC ATTRIBUTES INTO HTML */
const badge = require('./js/05_badges');
$.each(badge, (make, img) => {
    $('#' + make.toUpperCase() + '>img').attr('src', img);
});
/* !!!! yet to do */
//console.log($('.badgeBtn'));
$('.badgeBtn').on('click', (ev) => {
    console.log(ev);
    $('#partsViewFP').fadeOut();
    $('#partsViewContainer').fadeIn();
    console.log(ev.target.id);
});
console.log('Partscat.loaded');