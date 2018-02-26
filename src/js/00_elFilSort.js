module.exports = {
    sortItems(container) {
        var list = container;
        var listItems = list.children().get();
        listItems.sort(function(a, b) {
            var compA = $(a).text().toUpperCase();
            var compB = $(b).text().toUpperCase();
            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
        });
        $.each(listItems, function(idx, itm) {
            list.append(itm);
        });
    },
    filter(criteria, elementsTofilter) {
        let parts = $(elementsTofilter).children();
        //console.log(parts);
        let partClass = criteria;
        //console.log(partClass)
        parts.hide();
        $('.partslistheader').fadeIn('slow');
        parts.each(function(p, part) {
            //console.log('p: ' + p);
            //console.log(partClass);
            //console.log(part);
            //console.log(part.getAttribute('cat'));
            //console.log(part.id);
            if (part.getAttribute('cat') == partClass) {
                $('#' + part.id).fadeIn('slow');
            }

            //var id = parts[p].id; //.substr(0, parts[p].id.indexOf('_'));
            //if (partClass == idClass) {

            //$('#' + id).fadeIn('slow');
            //}
        });
    }
}