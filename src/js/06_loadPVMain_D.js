module.exports = partsViewFPClickD = (ev) => {

    var filterParts = (ev) => {
        // function for cross browswe compatibility, chrome clicks img, firefox clicks button
        let targetID;
        if ($(ev.target).is('img')) {
            targetID = ev.target.parentNode.id; // if target is element is img get parent element id - *chrome
        } else if ($(ev.target).is('button')) {
            targetID = ev.target.id; // if target element is button get target id - *firefox
        }
        // /* NOTE TO SELF: remember to test in other browsers

        let filteredPartsData = {}; // declare object to store selected parts
        for (var key in partsData) {
            var partMake = partsData[key].make; // stores this parts make for evaluation against targetID
            if (targetID == partsData[key].make) {
                filteredPartsData[key] = partsData[key];
                //console.log('true');
            }
        }
        return filteredPartsData;
    };

    var loadPartsIntoContainer = (filteredPartsData) => {
        for (var key in filteredPartsData) {
            //console.log(key);
            var partHtml = require('../html/part_D.html');
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