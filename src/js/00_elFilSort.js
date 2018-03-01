module.exports = {
    // Sorting function
    sortItems(container) {
        var list = container;
        var listItems = list.children().get();
        //console.log(listItems);
        listItems.sort(function(a, b) {
            //console.log(a, b);
            var compA = $(a).text().toUpperCase();
            var compB = $(b).text().toUpperCase();
            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
        });
        $.each(listItems, function(idx, itm) {
            list.append(itm);
        });
    },
    // Filter function
    filter(criteria, elementsTofilter) {
        let parts = $(elementsTofilter).children();
        //console.log(parts);
        let partClass = criteria;
        //console.log(partClass);
        parts.hide();
        $('.partslistheader').fadeIn('slow');
        parts.each(function(p, part) {
            if (part.getAttribute('cat') == partClass) {
                $('#' + part.id).fadeIn('slow');
            }
        });
    }
};