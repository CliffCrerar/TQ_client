module.exports = (ev) => {

    const filterParts = require('./00_filteringPartsData');

    var loadPartsIntoContainer = (filteredPartsData) => {
        for (var key in filteredPartsData) {
            //console.log(key);
            var partHtml = require('../html/partListing_D.html');
            //console.log($(partHtml));
            var partsAddKey = $(partHtml).attr('id', key);
            //console.log(partsAddKey);
            $('#pvHeaderCont').append(partsAddKey);
            //console.log(filteredPartsData[key]);
            $('#' + key).attr('name', filteredPartsData[key].partName);
            $('#' + key + '>.row>.pName').html(filteredPartsData[key].partName);
            $('#' + key + '>.row>.pNum').html(filteredPartsData[key].partNum);
            $('#' + key + '>.row>.pRandPrice').html(filteredPartsData[key].price);
            $('#' + key + '>.row>.pDollarPrice').html(filteredPartsData[key].price);
            //console.log(partsAddKey);

        }
    };
    return loadPartsIntoContainer(filterParts(ev));
};
console.log('06_partsviewFPclick.loaded');