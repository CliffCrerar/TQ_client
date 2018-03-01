module.exports = (ev) => {

    const filterParts = require('./00_filteringPartsData');

    var loadPartsIntoContainer = (filteredPartsData) => {
        for (var key in filteredPartsData) {
            //console.log(key);
            var partHtml = require('../html/partListing_D.html');
            //console.log($(partHtml));
            var partID = key;
            var partsAddPartID = $(partHtml).attr('id', partID).attr('cat', filteredPartsData[key].cat);
            $('#accordion').append(partsAddPartID);
            $('#' + partID).attr('id', partID).attr('cat', filteredPartsData[key].cat); // Adding part ID and Category
            $('#' + partID).children('.card-header').attr('id', partID + 'heading'); // Adding heading 
            $('#' + partID).children('.collapse').attr('id', 'collapse_' + partID).attr('aria-labelledby', partID + 'heading');
            $('#' + partID + '>.card-header>h5>button').attr('data-target', '#collapse_' + partID).attr('aria-controls', 'collapse_' + key).attr('id', 'btn_' + key);
            //console.log($('#' + key));
            //console.log(partsAddKey);
            //$('#accordian').append(partsAddKey);
            //console.log(filteredPartsData[key]);
            $('#btn_' + partID).attr('name', filteredPartsData[key].partName);
            $('#btn_' + partID + '>.row>.pName').html(filteredPartsData[key].partName);
            $('#btn_' + partID + '>.row>.pNum').html(filteredPartsData[key].partNum);
            $('#btn_' + partID + '>.row>.pRandPrice').html(filteredPartsData[key].price);
            $('#btn_' + partID + '>.row>.pDollarPrice').html(filteredPartsData[key].price);
            $('#collapse_' + partID + '>.card-body>.se-pre-con-1').attr('id', 'loader_' + partID);
            //console.log(partsAddKey);

        }
    };
    return loadPartsIntoContainer(filterParts(ev));
};
//console.log('06_partsviewFPclick.loaded');