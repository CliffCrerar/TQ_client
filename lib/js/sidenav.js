$(document).ready(function(){
    
    //filter parts when clicking sidenav

    $('#MotCycPartSideNav').bind('click',function(button){
        console.log('Click click');
        filterParts(button,'#bikeParts');
    });
    $('#TBPartSideNav').bind('click', function(button){
        filterParts(button,'#TopBoxPannierParts');
    });
    $('#sideNav4x4').bind('click',function(button){
        filterParts(button,'#Parts4x4');
    });

    //Filter bike Parts according to sidenav
    function filterParts(controls,FilterElements) {
        var parts = $(FilterElements).children();
        var partClass = controls.target.id;
        parts.hide();
        var p = 0;
        parts.each(function(div){
            var idClass = parts[p].id.substr(0, parts[p].id.indexOf('_'));
            if(partClass==idClass){
                console.log(parts[p]);
                $('#'+parts[p].id).fadeIn('slow');
            }
            //console.log('idClass '+idClass)
            //console.log('PartClass '+partClass)
            //console.log(parts[p].id)
            //console.log(p)
            p++;
        });
    }


});