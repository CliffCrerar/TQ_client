/*--------------------------*/
/*  LOAD PARTS FOR MOBILE   */
/*--------------------------*/
module.exports = (ev, fType) => {

    console.log(ev.currentTarget.id);
    const fp = require('./00_filteringPartsData'); // fp.byMake return the filteredPartsData data object
    console.log(fType);
    var loadPartsIntoMobileContainer = (filteredPartsData) => {
        for (var key in filteredPartsData) {
            var partsMobileHtml = require('../html/partListing_M.html');
            //console.log(filteredPartsData[key]);
            partsMobileHtml = $(partsMobileHtml).attr('id', key).attr('cat', filteredPartsData[key].make).attr('make', filteredPartsData[key].make);
            $(partsMobileHtml).find('img').attr('src', filteredPartsData[key].imgLink);
            $(partsMobileHtml).find('.pNameM').html(filteredPartsData[key].partName);
            $(partsMobileHtml).find('.pPriceM_ZAR').html(filteredPartsData[key].price);
            $(partsMobileHtml).find('.pPriceM_USD').html(filteredPartsData[key].price);
            $(partsMobileHtml).find('.pNumM').html('Part #: <b>' + filteredPartsData[key].partNum + '</b>');
            $(partsMobileHtml).find('.pDescM').html(filteredPartsData[key].partDesc);

            //console.log(partsMobileHtml);
            $('#partsViewContainerM').append(partsMobileHtml);
            //console.log($('#' + key + '>img'));
            //$('#' + key + '>img').attr('src', filteredPartsData[key].imgLink);
            //console.log($('#' + key + '>img'));
        }
    };
    let filteredPartsData;
    switch (fType) {
        case 'make':
            filteredPartsData = loadPartsIntoMobileContainer(fp.byMake(ev));
            break;
        case 'cat':
            filteredPartsData = loadPartsIntoMobileContainer(fp.byCat(ev));
            break;
    }
    return filteredPartsData;

};
//console.log('06_partsviewFPclick.loaded');