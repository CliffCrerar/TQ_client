//These scripts uses the partloader to load the parts 
$(document).ready(function(){
    //Get ktm bike parts data
    displayParts(KTM_Parts,'bikeParts','ktm');
    //get BMW bike parts data
    displayParts(BMW_parts,'bikeParts','bmw');
    //Get Land rover defender parts data
    displayParts(LRDef_parts,'Parts4x4','LandRover');
    //Get Land rover discovery parts data
    displayParts(LRDisc_parts,'Parts4x4','LandRover');
    //Get top box and pannier parts data
    displayParts(TopBoxPannier1,'TopBoxPannierParts','Tob boxes and Panniers');
    //Get honda parts data
    displayParts(HND_parts,'bikeParts','HND');
    /*
    //Get Africa twin parts data
    displayParts(TRI_parts,'bikeParts','TRI');
    //Get africa twin parts data
    displayParts(AT_parts,'bikeParts','AT') ;
    */
});