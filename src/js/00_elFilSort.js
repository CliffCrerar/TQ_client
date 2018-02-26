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
    filter(controls, FilterElements) {
        var parts = $(FilterElements).children();
        var partClass = controls.target.id;
        parts.hide();
        var p = 0;
        parts.each(function(div) {
            var idClass = parts[p].id //.substr(0, parts[p].id.indexOf('_'));
            if (partClass == idClass) {
                // console.log(parts[p])
                $('#' + parts[p].id).fadeIn('slow');
            }
            //console.log('idClass '+idClass)
            //console.log('PartClass '+partClass)
            //console.log(parts[p].id)
            //console.log(p)
            p++;
        });
    }
}