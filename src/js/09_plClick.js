/*----------------------------------------------------------*/
/*   Functions for part listing information lazy loading    */
/*----------------------------------------------------------*/

module.exports = {
    loadCollapsed(event) {
        let targetPart = $(event.target.id);
        console.log(targetPart);
        let partID = targetPart.split('_')[1];
        let loadHTML = (partID) => {
            //console.log($(event.target).attr('data-target')); 
            var collapsedHTML = $(require('../html/partListingCS_D.html')); // place collapsed HTML inside variable
            $(collapsedHTML).attr('id', 'CS_' + partID);
            $(collapsedHTML).find('.pDesc').html(partsData[partID].partDesc); // Assign part description
            $(collapsedHTML).find('.pModels').html(partsData[partID].models); // Assign models 
            $(collapsedHTML).find('.partImg').attr('src', partsData[partID].imgLink).attr('id', 'img_' + partID); // Assign image link
            $('#collapse_' + partID).find('.card-body').append(collapsedHTML);
        };
        Promise.resolve(loadHTML(partID))
            .then(() => {
                $('#img_' + partID).on('load', () => {
                    //console.log(ev11);
                    console.log('image loaded');
                    $('#loader_' + partID).fadeOut();
                });
            });
    }
};