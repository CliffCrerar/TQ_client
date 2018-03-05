/*----------------------------------------------------------*/
/*   Functions for part listing information lazy loading    */
/*----------------------------------------------------------*/

module.exports = {
    loadCollapsed(btnID) {
        //console.log(btnID);
        let partID = btnID.split('-')[1];
        //console.log($("#collapse_" + partID).find('#CS_' + partID).length);
        var loadedPrior = $("#collapse_" + partID).find('#CS-' + partID).length;
        if (loadedPrior == 0) {
            Promise.resolve($(require('../html/partListingCS_D.html'))) // place collapsed HTML inside variable
                .then((collapsedHTML) => {
                    $('#collapse-' + partID).find('.card-body').append(collapsedHTML);
                    $('#collapse-' + partID).find('.collapsedSection').attr('id', 'CS-' + partID);
                    $('#CS-' + partID).find('p.pDesc').html(window.partsData[partID].partDesc); // Assign part description
                    $('#CS-' + partID).find('p.pModels').html(window.partsData[partID].models.join(' | ')); // Assign models
                    $('#CS-' + partID).find('p.pGrnt').html(window.partsData[partID].grnt);
                    $('#CS-' + partID).find('p.pFtime').html(window.partsData[partID].instTime); // Assign models

                    $('#CS-' + partID).find('img.partImg').attr('src', window.partsData[partID].imgLink).attr('id', 'img-' + partID); // Assign image link
                    $('#CS-' + partID).find('.quote').attr('id', 'Q-' + partID).attr('data-target', '#modal-' + partID);


                })
                .then(() => {
                    var modReqQteHtml = require('../html/mod_requestQuote.html');
                    modReqQteHtml = $(modReqQteHtml).attr('id', 'modal-' + partID) //.attr('aria-labelledby', 'modalMail-' + partID);
                        //modReqQteHtml = $(modReqQteHtml).find('.modal-title').attr('id', 'modalMail-' + partID); //.attr();
                        //modReqQteHtml = $(modReqQteHtml).find('.modal-title').attr('aria-labelledby', 'modal-mail-' + partID);
                        //modReqQteHtml = $(modReqQteHtml).find('.modal-title').html('Request for Quotation(' + partID + ')');
                    $('#Q-' + partID).parent().append($(modReqQteHtml));
                    //console.log(modReqQteHtmlID);
                })
                .then(() => {
                    $('#img-' + partID).on('load', () => {
                        //console.log(ev11);
                        // console.log('image loaded');
                        $('#loader-' + partID).fadeOut();
                    });
                });
        }
    },
    clickLike(ev) {
        $(ev.target).addClass('active');
    },
    clickQuote(ev) {
        //console.log('QUOTE: ', ev);
        console.log($(ev.target));
        var partID = ev.target.id.split('-')[1];
        console.log(partID);
        $('#modal-' + partID).find('.card-body').empty();
        var cardEntry =
            '<p class="lead partQteEntry">Part Name : ' + partsData[partID].partName + '</p><br>' +
            '<p class="partEntry">Part Number: ' + partID + '</p>' +
            '<p>For: ' + partsData[partID].make + ' ' + partsData[partID].models + '</p>' +
            '<p class="lead partQteEntry">Priced(ZAR): ' + partsData[partID].salePriceZAR + '</p>' +
            '<p class="lead partQteEntry">Priced(USD): ' + partsData[partID].salePriceUSD + '</p>';

        $('#modal-' + partID).find('.card-body').append(cardEntry);
    }
};