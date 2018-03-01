/* LOAD PARTS ONTO MAIN VIEW MIDDLE SECTION ACCORDING TO USER SELECTION */
module.exports = (ev) => {

    const filterParts = require('./00_filteringPartsData');

    var loadPartsIntoContainer = (filteredPartsData) => {
        for (var key in filteredPartsData) {
            //console.log(key);
            var partHtml = require('../html/part.html');
            //console.log($(partHtml));
            var partsAddKey = $(partHtml).attr('id', key);
            //console.log(partsAddKey);
            $('#pvHeaderCont').append(partsAddKey);
            //console.log(filteredPartsData[key]);
            $('#' + key + '>button>.row>#pName').html(filteredPartsData[key].partName);
            $('#' + key + '>button>.row>#pRandPrice').html(filteredPartsData[key].price);
            $('#' + key + '>button>.row>#pDollarPrice').html(filteredPartsData[key].price);
        }
    };
    return loadPartsIntoContainer(filterParts(ev));
};
//console.log('06_partsviewFPclick.loaded');