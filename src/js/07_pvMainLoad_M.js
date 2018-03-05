/*--------------------------*/
/*  LOAD PARTS FOR MOBILE   */
/*--------------------------*/
module.exports = (ev, fType) => {

    //console.log(ev.currentTarget.id);
    const fp = require('./00_filteringPartsData'); // fp.byMake return the filteredPartsData data object
    //console.log(fType);
    var loadPartsIntoMobileContainer = (filteredPartsData) => {
        for (var key in filteredPartsData) {
            var partsMobileHtml = require('../html/partListing_M.html');
            //console.log(filteredPartsData[key]);
            partsMobileHtml = $(partsMobileHtml).attr('id', key).attr('cat', filteredPartsData[key].cat).attr('make', filteredPartsData[key].make);
            $(partsMobileHtml).find('img').attr('src', filteredPartsData[key].imgLink);
            $(partsMobileHtml).find('.pNameM').html(filteredPartsData[key].partName);
            $(partsMobileHtml).find('.pPriceM-ZAR').html(filteredPartsData[key].salePriceZAR);
            $(partsMobileHtml).find('.pPriceM-USD').html(filteredPartsData[key].salePriceUSD);
            $(partsMobileHtml).find('.pNumM').html('Part #: <b>' + filteredPartsData[key].partNum + '</b>');
            $(partsMobileHtml).find('.pDescM').html(filteredPartsData[key].partDesc);
            $(partsMobileHtml).find('.pModelsM').html('<b>Models:</b><br>' + filteredPartsData[key].models.join(' | '));
            $(partsMobileHtml).find('.quoteM').attr('id', 'Q-' + key).attr('data-target', '#modal-' + key);

            //console.log(partsMobileHtml);
            $('#partsViewContainerM').append(partsMobileHtml);
            //console.log($('#' + key + '>img'));
            //$('#' + key + '>img').attr('src', filteredPartsData[key].imgLink);
            //console.log($('#' + key + '>img'));
            var modReqQteHtml = require('../html/mod_requestQuote.html');
            modReqQteHtml = $(modReqQteHtml).attr('id', 'modal-' + key) //.attr('aria-labelledby', 'modalMail-' + partID);
                //modReqQteHtml = $(modReqQteHtml).find('.modal-title').attr('id', 'modalMail-' + partID); //.attr();
                //modReqQteHtml = $(modReqQteHtml).find('.modal-title').attr('aria-labelledby', 'modal-mail-' + partID);
                //modReqQteHtml = $(modReqQteHtml).find('.modal-title').html('Request for Quotation(' + partID + ')');
            $('#Q-' + key).parent().append($(modReqQteHtml));
            //console.log(modReqQteHtmlID);
        }
    };
    let filteredPartsData;
    switch (fType) {
        case 'make':
            filteredPartsData = loadPartsIntoMobileContainer(fp.byMake(ev));
            break;
        case 'cat':
            filteredPartsData = loadPartsIntoMobileContainer(fp.byCat(ev));
            break;
    }
    return filteredPartsData;

};
//console.log('06_partsviewFPclick.loaded');