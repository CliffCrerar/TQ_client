module.exports = partsViewFPClick = (ev) => {

    var filterParts = (ev) => {
        // function for cross browswe compatibility, chrome clicks img, firefox clicks button
        let targetID;
        if ($(ev.target).is('img')) {
            targetID = ev.target.parentNode.id; // if target is element is img get parent element id - *chrome
        } else if ($(ev.target).is('button')) {
            targetID = ev.target.id; // if target element is button get target id - *firefox
        }
        /* NOTE TO SELF: remember to test in other browsers */

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
    var showPartsViewContainer = (parts) => {
        //console.log($.contains(document.))
        $('#partsViewFP').fadeOut();
        var hasContainer = $.contains(document.body, document.body.children.P_1.children.partsViewContainer); // checks if the partsview container exist
        console.log(hasContainer);
        if (hasContainer) {
            $('#partsViewContainer').fadeIn();
        } else {
            alert('do not have element');
            var partsViewContainer = require('../html/partsView.html');
            console.log(partsViewContainer);
            $('#P_1').append(partsViewContainer);
        }

        return parts;
    };
    return showPartsViewContainer(filterParts(ev));
};
console.log('06_partsviewFPclick.loaded')