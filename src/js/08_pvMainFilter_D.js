module.exports = function(event) {

    const filterByMake = require('./00_filteringPartsData');

    let buttonFrame = require('../html/partFilters.html');
    //console.log($(buttonFrame));
    $('#left').append(buttonFrame);
    $('#selectInd').html('MAKE: ' + event.target.id);
    //console.log(partsData);

    let parts = filterByMake(event);

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
    for (var i = 0; i < arrLen; i++) {
        $('#btnCont').append('<button type="button" class="btn btn-block btn-secondary">' + filterList[i] + '</button>');
    }

    return $('.defFilter').on('click', () => {
        console.log('click');
        console.log($('#filterOptions').hasClass('show'));
        if ($('#filterOptions').hasClass('show')) {
            $('#filterOptions').removeClass('show');
        } else {
            $('#filterOptions').addClass('show');
        }
    });

};

/* FILTER EVENTS */