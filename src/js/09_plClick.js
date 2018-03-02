/*----------------------------------------------------------*/
/*   Functions for part listing information lazy loading    */
/*----------------------------------------------------------*/

module.exports = {
    loadCollapsed(btnID) {
        //console.log(btnID);
        let partID = btnID.split('_')[1];
        //console.log($("#collapse_" + partID).find('#CS_' + partID).length);
        var loadedPrior = $("#collapse_" + partID).find('#CS_' + partID).length;
        if (loadedPrior == 0) {
            Promise.resolve($(require('../html/partListingCS_D.html'))) // place collapsed HTML inside variable
                .then((collapsedHTML) => {
                    $('#collapse_' + partID).find('.card-body').append(collapsedHTML);
                    $('#collapse_' + partID).find('.collapsedSection').attr('id', 'CS_' + partID);
                    $('#CS_' + partID).find('p.pDesc').html(window.partsData[partID].partDesc); // Assign part description
                    $('#CS_' + partID).find('p.pModels').html(window.partsData[partID].models.join(' | ')); // Assign models
                    $('#CS_' + partID).find('img.partImg').attr('src', window.partsData[partID].imgLink).attr('id', 'img_' + partID); // Assign image link
                })
                .then(() => {
                    $('#img_' + partID).on('load', () => {
                        //console.log(ev11);
                        // console.log('image loaded');
                        $('#loader_' + partID).fadeOut();
                    });
                });
        }

    }
};