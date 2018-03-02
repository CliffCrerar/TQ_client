/* IMPORT CSS */
import './css/partsViewFP.css';
import './css/partsView.css';
/* BOOSTRAP 4 */
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
/* FONT AWESOME FOR WEB PACK */
import 'font-awesome-webpack';
import { resolve } from 'path';
/* CALL PART VIEW POPULATE FUNCTION */
const loadPartList = require('./js/06_pvMainLoad_D');
const loadButtons = require('./js/08_pvMainFilter_D');
const psExpander = require('./js/09_plClick');
/* SORTING AND FILTERING */
const sortFilter = require('./js/00_elFilSort');
/* LOAD PARTS VIEW FRONT PAGE */
$('#pageCont').append(require('./html/partsViewFP.html'));

$('.badgeBtnCont').css('width', $('#pageCont').width());
/* POPULATE BADGE BUTTONS ATTRIBUTES INTO HTML */
const badge = require('./js/05_badges');
$.each(badge, (make, img) => {
    $('#' + make.toUpperCase() + '>img').attr('src', img);
});
/* LOAD HTML INTO PARTS VIEW CONTAINTER */
$('#P_1').append(require('./html/partsViewCont.html'));
/* CLICK FUNCTION FOR PARTSVIEW FRONT PAGE */
$('.badgeBtn').on('click', (ev) => {
    $('#P_1').css('height', $('#pageCont').height());
    //console.log(ev.target);

    $('#partsViewFP').fadeOut();
    $('#partsViewContainer').fadeIn();
    //console.log(ev.target.id);
    Promise.resolve(loadPartList(ev, 'make'))
        .then(() => {
            sortFilter.sortItems($('#accordion'));
            // On click event for expanding parts listing
            $('.partListing').on('click', (ev) => {
                //console.log(ev.currentTarget.id);
                psExpander.loadCollapsed(ev.currentTarget.id);
            });

        });
    Promise.resolve(loadButtons(ev, 'cat'))
        .then(() => {
            sortFilter.sortItems($('#btnCont'));
            // On click event for parts view back button
            $('#backBtn').on('click', () => {
                $('#accordion').empty();
                $('#left').empty();
                $('#partsViewFP').fadeIn();
                $('#partsViewContainer').fadeOut();
            });
            // On click event for filter buttons
            $('#btnCont').on('click', (ev) => {
                var filtCriteria = ev.target.id;
                //console.log(ev.currentTarget);
                $(ev.currentTarget).children().each(function(i, el) {
                    $(el).removeClass('active');
                });
                $(ev.target).addClass('active');
                //console.log(filtCriteria);
                sortFilter.filterCat(filtCriteria, $('#accordion'));
            });
        });
});

$('#accordian').on('load', function() {
    console.log('accordian loaded');
});




/* SET ON HOVER FOR PARTS LIST HEADER */
/*
$(document).on({
    mouseenter: function(eve) {
        //stuff to do on mouse enter
        $('#' + eve.target.id + '>.row>.pClick').removeClass('invisible');
    },
    mouseleave: function(evl) {
        //stuff to do on mouse leave
        $('#' + evl.target.id + '>.row>.pClick').addClass('invisible');
    }
}, '.partListing');
*/

// console.log('Partscat.loaded');