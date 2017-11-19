//sort items in a contaners

var sortItems = function(container) {
    var partsList = container;
    var partListItems = partsList.children().get();
    partListItems.sort(function(a,b){
        var compA = $(a).text().toUpperCase();
        var compB = $(b).text().toUpperCase();
        return(compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
    $.each(partListItems, function(idx,itm) {partsList.append(itm);});
};