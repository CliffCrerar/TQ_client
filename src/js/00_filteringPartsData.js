/* FILTERING OUT PARTS ACCORDING TO USER SELECTION */
module.exports = {
    // function for cross browswe compatibility, chrome clicks img, firefox clicks button
    byMake(ev) {
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
            }
        }
        return filteredPartsData;
    },

    byCat(ev) {
        let filteredPartsData = {}; // declare object to store selected parts
        let targetID = ev.currentTarget.id.split('_')[1]; // get filter criteria which must be class
        console.log(targetID);
        for (var key in partsData) {
            var partClass = partsData[key].cat; // stores the current parts category/class
            if (targetID == partClass) {
                filteredPartsData[key] = partsData[key];
            }
        }
        return filteredPartsData;
    }
};