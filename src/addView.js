/*------------------------*/
/*  PARTS CATELOGUE PAGE  */
/*------------------------*/

const loadPartsListD = require('./js/06_pvMainLoad_D');
const loadButtonsD = require('./js/08_pvMainFilter_D');
const sortFilter = require('./js/00_elFilSort');
const psExpander = require('./js/10_plClick');

$('.addTitle').on('click', (ev) => {
    $('#N_0').removeClass('active');
    let selectedClass = ev.currentTarget.id.split('_')[1]; // get selected class from clicked link
    //console.log(selectedClass);
    $('#P_1').show();
    $('#P_0').hide();
    $('#partsViewFP').hide();
    $('#partsViewContainer').fadeIn('slow').css('height', $('#pageCont').height());

    Promise.resolve(loadPartsListD(ev, 'cat'))
        .then(() => {
            sortFilter.sortItems($('#accordion'));
            $('.partListing').on('click', (ev) => {
                //console.log(ev.currentTarget.id);
                psExpander.loadCollapsed(ev.currentTarget.id);
            });
        });
    Promise.resolve(loadButtonsD(ev, 'make'))
        .then(() => {
            sortFilter.sortItems($('#btnCont'));

            $('#backBtn').on('click', () => {
                $('#accordion').empty();
                $('#left').empty();
                $('#partsViewContainer').css('display', 'none');
                $('#P_0').fadeIn();
            });
            $('#btnCont').on('click', (ev) => {
                //console.log(ev.target.id)
                var filtCriteria = ev.target.id;
                //console.log(ev.currentTarget);
                $(ev.currentTarget).children().each(function(i, el) {
                    $(el).removeClass('active');
                });
                $(ev.target).addClass('active');
                //console.log(filtCriteria);
                sortFilter.filterMake(filtCriteria, $('#accordion'));
            });
        });
});