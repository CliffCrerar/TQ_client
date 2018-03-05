/*--------------------------*/
/*  LOAD PARTS FOR DESKTOP  */
/*--------------------------*/
module.exports = (ev, fType) => {

    const fp = require('./00_filteringPartsData'); // fp.byMake return the filteredPartsData data object
    // console.log(fType);
    var loadPartsIntoContainer = (filteredPartsData) => {
        for (var key in filteredPartsData) {
            var partHtml = require('../html/partListing_D.html');
            var partID = key;
            var partsAddPartID = $(partHtml).attr('id', partID).attr('cat', filteredPartsData[key].cat);
            $('#accordion').append(partsAddPartID);
            $('#' + partID).attr('id', partID).attr('cat', filteredPartsData[key].cat).attr('make', filteredPartsData[key].make); // Adding part ID and custom Category and make
            $('#' + partID).children('.card-header').attr('id', partID + 'heading'); // Adding heading 
            $('#' + partID).children('.collapse').attr('id', 'collapse-' + partID).attr('aria-labelledby', partID + 'heading');
            $('#' + partID + '>.card-header>h5>button').attr('data-target', '#collapse-' + partID).attr('aria-controls', 'collapse-' + key).attr('id', 'btn-' + key);
            $('#btn-' + partID).attr('name', filteredPartsData[key].partName);
            $('#btn-' + partID + '>.row>.pName').html(filteredPartsData[key].partName);
            $('#btn-' + partID + '>.row>.pNum').html(filteredPartsData[key].partNum);
            $('#btn-' + partID + '>.row>.pRandPrice').html(filteredPartsData[key].salePriceZAR);
            $('#btn-' + partID + '>.row>.pDollarPrice').html(filteredPartsData[key].salePriceUSD);
            $('#collapse-' + partID + '>.card-body>.se-pre-con-1').attr('id', 'loader-' + partID);
            //console.log(partsAddKey);
        }
    };
    let filteredPartsData;
    switch (fType) {
        case 'make':
            filteredPartsData = loadPartsIntoContainer(fp.byMake(ev));
            break;
        case 'cat':
            filteredPartsData = loadPartsIntoContainer(fp.byCat(ev));
            break;
    }
    return filteredPartsData;
};
//console.log('06_partsviewFPclick.loaded');