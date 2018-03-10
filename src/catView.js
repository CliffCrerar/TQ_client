/* IMPORT CSS */
import './css/partsViewFP.css';
import './css/partsView.css';
import './css/mod_requestQuote.css';
/* BOOSTRAP 4 */
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
/* FONT AWESOME FOR WEB PACK */
import 'font-awesome-webpack';
import { resolve } from 'path';
/* CALL PART VIEW POPULATE FUNCTION */
const loadPartListD = require('./js/06_pvMainLoad_D');
const loadPartListM = require('./js/07_pvMainLoad_M');
const loadButtonsD = require('./js/08_pvMainFilter_D');
const loadButtonsM = require('./js/09_pvMainFilter_M');
const psExpander = require('./js/10_plClick');
const P = require('./js/00_partloading');
window.collapsesLoaded = []; // array of part numbers wich collapsed sections have been loaded
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
if (vpw > 414) { $('#P-1').append(require('./html/partsViewCont.html')); }

/* CLICK FUNCTION FOR PARTSVIEW FRONT PAGE */
const partloading = new P();
$('.badgeBtn').on('click', (ev) => {
    $('#P-1').css('height', $('#pageCont').height());

    if (vpw > 414) {
        /* BEGINNING OF PARTS LOADING FOR DESKTOP */
        console.log('PARTS LOAD FOR DESKTOP');
        $('#partsViewFP').fadeOut();
        $('#partsViewContainer').fadeIn();
        //console.log(ev.target.id);


        var funcLPSD = loadPartListD(ev, 'make');
        partloading.createPartsList(funcLPSD, sortFilter, psExpander);
        // LOAD PARTS LIST PROMISE
        /*
        Promise.resolve(loadPartListD(ev, 'make'))
            .then(() => {
                sortFilter.sortItems($('#accordion'));
                // On click event for expanding parts listing
                $('.partListing').on('click', (ev) => {
                    //console.log(ev.currentTarget.id);
                    Promise.resolve(psExpander.loadCollapsed(ev.currentTarget.id))
                        .then(() => {

                            $('.like').on('click', (event) => {
                                console.log('like');
                                psExpander.clickLike(event);
                            });
                            $('.quote').on('click', (event) => {
                                console.log('Quote');
                                psExpander.clickQuote(event);
                            });

                        });
                });

            });*/
        //LOAD PARTS LIST PROMISE

        Promise.resolve(loadButtonsD(ev, 'cat'))
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
        /* END OF PARTS LOADING FOR DESKTOP */
    } else {
        /* BEGINNING OF PARTS LOADING FOR MOBILE */
        console.log('PARTS LOAD FOR MOBILE');
        //$('#partsViewContainer').remove();
        $('#partsViewContainerM').remove();
        $('#P-1').append('<div id="partsViewContainerM" class="pvContainer"></div>');
        $('#partsViewFP').fadeOut();
        $('#partsViewContainerM').fadeIn();

        Promise.resolve(loadPartListM(ev, 'make'))
            .then(() => {
                console.log('MOB PARTLIST Promise resolved');
                sortFilter.sortItems($('#partsViewContainerM'));
                $('.quoteM').on('click', (event) => {
                    console.log('Quote');
                    psExpander.clickQuote(event);
                });
            });
        Promise.resolve(loadButtonsM(ev, 'cat'))
            .then(() => {
                console.log('MOB Promise resolved');
                sortFilter.sortItems($('#filtContListM'));
                $('#filtContListM').on('click', (ev) => {
                    var filtCriteria = ev.target.id;
                    //partsViewContainerM
                    sortFilter.filterCat(filtCriteria, $('#partsViewContainerM'));
                });
            });

        /* END OF PARTS LOADING FOR MOBILE */
    }

});

$('#accordian').on('load', function() {
    console.log('accordian loaded');
});

// console.log('Partscat.loaded');