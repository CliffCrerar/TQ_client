/*----------------------------------------------------------*/
/*   Functions for part listing information lazy loading    */
/*----------------------------------------------------------*/

module.exports = {
    loadCollapsed(btnID) {
        //console.log(btnID);
        let partID = btnID.split('-')[1];
        //COMING SOON
        const CS = require('../image/cs6.png');
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
                    $('#CS-' + partID).find('p.pFtime').html(window.partsData[partID].newInstTime);
                    $('#CS-' + partID).find('img.partImg').attr('src', window.partsData[partID].imgLink).attr('id', 'img-' + partID); // Assign image link
                    $('#CS-' + partID).find('.quote').attr('id', 'Q-' + partID).attr('data-target', '#modal-' + partID);
                    $('#CS-' + partID).find('.fullView').attr('id', 'FV-' + partID).attr('data-target', '#modal-' + partID);
                    $('#CS-' + partID).find('.like').attr('id', 'LIKE-' + partID);

                    //for comming soon
                    $('#FV-' + partID + '>img').attr('src', CS);
                    $('#LIKE-' + partID + '>img').attr('src', CS);
                    //for comning soom
                })
                .then(() => {
                    var modReqQteHtml = require('../html/mod_requestQuote.html');
                    modReqQteHtml = $(modReqQteHtml).attr('id', 'modal-' + partID);
                    //.attr('aria-labelledby', 'modalMail-' + partID);
                    //modReqQteHtml = $(modReqQteHtml).find('.modal-title').attr('id', 'modalMail-' + partID); //.attr();
                    //modReqQteHtml = $(modReqQteHtml).find('.modal-title').attr('aria-labelledby', 'modal-mail-' + partID);
                    //modReqQteHtml = $(modReqQteHtml).find('.modal-title').html('Request for Quotation(' + partID + ')');
                    $('#Q-' + partID).parent().append($(modReqQteHtml));
                    //console.log(modReqQteHtmlID);
                    $('.sendQuoteRequest').on('click', ev => {
                        require('./10.1_modalAction.js')(ev);
                    });
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
        var like = require('./11_clickLike');
        like(ev);
    },
    clickQuote(ev) {
        //console.log('QUOTE: ', ev);
        //console.log($(ev.currentTarget));
        var partID = ev.currentTarget.id.split('-')[1];
        //console.log(partID);
        $('#modal-' + partID).find('.card-body').empty();
        $('#modal-' + partID).find('.sendQuoteRequest').attr('data-target', 'modal-' + partID);
        var cardEntry =
            '<p class="lead partQteEntry">Part Name : ' + partsData[partID].partName + '</p>' +
            '<p class="partEntry">Part Number: ' + partID + '</p>' +
            '<p>For: ' + partsData[partID].make + ' ' + partsData[partID].models + '</p>' +
            '<p class="lead partQteEntry">Priced(ZAR): ' + partsData[partID].salesPriceZAR + '</p>' +
            '<p class="lead partQteEntry">Priced(USD): ' + partsData[partID].salesPriceUSD + '</p>';

        $('#modal-' + partID).find('.card-body').append(cardEntry);
    }
};