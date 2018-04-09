/*--------------------------*/
/*  LOAD PARTS FOR MOBILE   */
/*--------------------------*/
module.exports = (ev, fType) => {

    //console.log(ev.currentTarget.id);
    const fp = require('./00_filteringPartsData'); // fp.byMake return the filteredPartsData data object
    //console.log(fType);
    var loadPartsIntoMobileContainer = (filteredPartsData) => {
        var lang = window.navigator.language;
        for (var partID in filteredPartsData) {
            var partsMobileHtml = require('../html/partListing_M.html');
            //console.log(filteredPartsData[key]);
            partsMobileHtml = $(partsMobileHtml).attr('id', partID).attr('cat', filteredPartsData[partID].cat).attr('make', filteredPartsData[partID].make);
            $(partsMobileHtml).find('img').attr('src', filteredPartsData[partID].imgLink);
            $(partsMobileHtml).find('.pNameM').html(filteredPartsData[partID].make+' '+filteredPartsData[partID].partName);
            $(partsMobileHtml).find('.pPriceM-ZAR').html('R '+filteredPartsData[partID].salesPriceZAR.toLocaleString(lang));
            $(partsMobileHtml).find('.pPriceM-USD').html('$ '+filteredPartsData[partID].salesPriceUSD.toLocaleString(lang));
            $(partsMobileHtml).find('.pNumM').html('Part #: <b>' + filteredPartsData[partID].partNum + '</b>');
            $(partsMobileHtml).find('.pDescM').html(filteredPartsData[partID].partDesc);
            $(partsMobileHtml).find('.pModelsM').html('<b>Models:</b><br>' + filteredPartsData[partID].models.join(' | '));
            $(partsMobileHtml).find('.quoteM').attr('id', 'Q-' + partID).attr('data-target', '#modal-' + partID);

            //console.log(partsMobileHtml);
            $('#partsViewContainerM').append(partsMobileHtml);
            //console.log($('#' + key + '>img'));
            //$('#' + key + '>img').attr('src', filteredPartsData[key].imgLink);
            //console.log($('#' + key + '>img'));
            var modReqQteHtml = require('../html/mod_requestQuote.html');
            modReqQteHtml = $(modReqQteHtml).attr('id', 'modal-' + partID) //.attr('aria-labelledby', 'modalMail-' + partID);
                //modReqQteHtml = $(modReqQteHtml).find('.modal-title').attr('id', 'modalMail-' + partID); //.attr();
                //modReqQteHtml = $(modReqQteHtml).find('.modal-title').attr('aria-labelledby', 'modal-mail-' + partID);
                //modReqQteHtml = $(modReqQteHtml).find('.modal-title').html('Request for Quotation(' + partID + ')');
            $('#Q-' + partID).parent().append($(modReqQteHtml));
            
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