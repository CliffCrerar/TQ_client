/*-------------------------------------*/
/*CREATES PARTS VIEW FILTERS FOR MOBILE*/
/*-------------------------------------*/

// FTYPE argument should determine what buttons myst be returned 'cat' or 'make'

const badges = require('./05_badges');
module.exports = function(event, fType) {
    /*  */
    $('#pageCont').append(require('../html/partFilControls_M.html'));
    const fp = require('./00_filteringPartsData');
    const disc = event.currentTarget.id;
    const type = fType;
    let parts;
    let btnCapLeg;

    console.log(event);

    if (type == 'cat') {
        parts = fp.byMake(event);
        btnCapLeg = require('../json/categories.json');
    } else if (type == 'make') {
        parts = fp.byCat(event);
        btnCapLeg = require('../json/makes.json');
    }

    console.log(parts);
    console.log(btnCapLeg);


    let filterList = [];
    let evalElement = '';
    for (var key in parts) {
        //console.log(parts[key][type]);
        evalElement = parts[key][type];
        if (!filterList.includes(evalElement)) {
            filterList.push(evalElement);
        }
    }
    //console.log(filterList);
    let arrLen = filterList.length;
    let btnCaption = '';
    for (var i = 0; i < arrLen; i++) {
        btnCaption = filterList[i];
        for (var key2 in btnCapLeg) {
            if (btnCaption == key2) {
                btnCaption = btnCapLeg[key2];
            }
        }
        //$('#btnCont').append('<button id = "' + filterList[i] + '" type="button" class="btn btn-block btn-outline-success text-left">' + btnCaption + '</button>');
        $('#filtContListM').append('<button id = "' + filterList[i] + '" class="dropdown-item" type="button">' + btnCaption + '</button>');
        $('#filtContListM').append('<button id = "' + filterList[i] + '" class="dropdown-item" type="button">' + btnCaption + '</button>');
    }

    return $('.filterDropDownM>button').on('click', (ev) => {
        console.log('Drop down click');
        if ($('#filtContListM').hasClass('show')) {
            $('#filtContListM').addClass('show');
        } else {
            $('#filtContListM').removeClass('show');
        }
    });
};