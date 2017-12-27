//These sorting functions

$(document).ready(function(){
    
    //This sorts the category buttons on the side navigation 

    var sideNavList = $('#MotCycPartSideNav');
    var listItems = sideNavList.children().get();
    listItems.sort(function(a,b){
        var compA = $(a).text().toUpperCase();
        var compB = $(b).text().toUpperCase();
        return(compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
    $.each(listItems, function(idx, itm) {sideNavList.append(itm);});

    
});
