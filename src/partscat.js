/*------------------------*/
/*  PARTS CATELOGUE PAGE  */
/*------------------------*/

/* IMPORT CSS */
import './css/partsViewFP.css';
import './css/partsView.css';

/* LOAD HTML */
$('#pageCont').append(require('./html/partsViewFP.html'));

/* LOAD BADGE SRC ATTRIBUTES INTO HTML */
const badge = require('./js/05_badges');
console.log(badge);
$.each(badge, (make, img) => {
    console.log(make, img);
});

/* !!!! yet to do */
//console.log($('.badgeBtn'));
$('.badgeBtn').on('click', (ev) => {
    //console.log(ev);
});

console.log('Partscat.loaded');