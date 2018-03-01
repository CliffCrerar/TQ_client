/*--------------------------*/
/*CREATES PARTS VIEW FILTERS*/
/*--------------------------*/

module.exports = function(event) {

    const filterByMake = require('./00_filteringPartsData');
    let filterBtnName;
    if (window.navigator.vendor != "") {
        filterBtnName = $(event.target).attr('alt')
            //console.log($(event.target).attr('alt'));
    } else {
        filterBtnName = event.target.id;
        //console.log(event.target.id);
    } // determine browser and extract button name
    //$('#selectInd').html('MAKE: ' + event.target.id);
    $('#left').append(require('../html/partFilControls.html'));
    $('.defFilter').html('<div class="p2">' + filterBtnName + '</div><div class="filterIcon ml-auto p-2 fa fa-filter"></div>');
    let parts = filterByMake(event);
    let categories = require('../json/categories.json');
    //console.log(categories);
    let filterList = [];
    var evalElement = '';
    for (var key in parts) {
        //console.log(parts[key].cat);
        evalElement = parts[key].cat;
        if (!filterList.includes(evalElement)) {
            filterList.push(evalElement);
        }
    }
    //console.log(filterList);
    var arrLen = filterList.length;
    var btnCaption = '';
    for (var i = 0; i < arrLen; i++) {
        btnCaption = filterList[i];
        for (var key2 in categories) {
            if (btnCaption == key2) {
                btnCaption = categories[key2];
            }
        }
        $('#btnCont').append('<button id = "' + filterList[i] + '" type="button" class="btn btn-block btn-outline-success text-left">' + btnCaption + '</button>');
    }

    return $('.defFilter').on('click', () => {
        //console.log('click');
        //console.log($('#filterOptions').hasClass('disp'));
        if ($('#filterOptions').hasClass('show')) {
            $('#filterOptions').slideUp('2000').removeClass('show');
            $('#openFilt').removeClass('active');
            $('#accordion').children().each((i, el) => {
                $(el).fadeIn('slow');
            });
            $('#btnCont').children().each(function(i, el) {
                $(el).removeClass('active');
            });
        } else {
            $('#filterOptions').slideDown('2000').addClass('show');
            $('#openFilt').addClass('active');
        }
    });
};

/* FILTER EVENTS */