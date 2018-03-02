/*-------------------------------------*/
/*CREATES PARTS VIEW FILTERS FOR MOBILE*/
/*-------------------------------------*/

// FTYPE argument should determine what buttons myst be returned 'cat' or 'make'
module.exports = function(event, fType) {
    /*  */

    $('#partsViewContainerM').prepend(require('../html/partFilControls_M.html'));
};