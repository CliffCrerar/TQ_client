/*--------------------------*/
/*  LOAD PARTS FOR DESKTOP  */
/*--------------------------*/
module.exports = (ev, fType) => {
  const fp = require("./00_filteringPartsData"); // fp.byMake return the filteredPartsData data object
  // console.log(fType);
  var loadPartsIntoContainer = filteredPartsData => {
    var lang = window.navigator.language;
    for (var partID in filteredPartsData) {
      var partHtml = require("../html/partListing_D.html"); // get framework for part item
      var partsAddPartID = $(partHtml).attr("id", partID).attr("cat", filteredPartsData[partID].cat); // assign categegory
      $("#accordion").append(partsAddPartID);
      $("#" + partID).attr("id", partID).attr("cat", filteredPartsData[partID].cat).attr("make", filteredPartsData[partID].make); // Adding part ID and custom Category and make
      $("#" + partID).children(".card-header").attr("id", partID + "heading"); // Adding heading
      $("#" + partID).children(".collapse").attr("id", "collapse-" + partID).attr("aria-labelledby", partID + "heading");
      $("#" + partID + ">.card-header>h5>button").attr("data-target", "#collapse-" + partID).attr("aria-controls", "collapse-" + partID).attr("id", "btn-" + partID);
      $("#btn-" + partID).attr("name", filteredPartsData[partID].partName);
      $("#btn-" + partID + ">.row>.pName").html('<span class="colapseInd fa fa-plus" aria-hidden="true"></span>' + filteredPartsData[partID].partName);
      $("#btn-" + partID + ">.row>.pNum").html(filteredPartsData[partID].partNum);
      $("#btn-" + partID + ">.row>.pRandPrice").html('R '+filteredPartsData[partID].salesPriceZAR.toLocaleString(lang));
      $("#btn-" + partID + ">.row>.pDollarPrice").html('$ '+filteredPartsData[partID].salesPriceUSD.toLocaleString(lang));
      $("#collapse-" + partID + ">.card-body>.se-pre-con-1").attr("id","loader-" + partID);
      //console.log(partsAddKey);
    }
  };
  let filteredPartsData;
  switch (fType) {
    case "make":
      filteredPartsData = loadPartsIntoContainer(fp.byMake(ev));
      break;
    case "cat":
      filteredPartsData = loadPartsIntoContainer(fp.byCat(ev));
      break;
  }
  return filteredPartsData;
};
//console.log('06_partsviewFPclick.loaded');
