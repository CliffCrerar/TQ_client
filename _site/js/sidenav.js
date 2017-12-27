$(document).ready(function(){

    $('#MotCycPartSideNav>button').bind('click',function(button){
        //console.log(button);
        //console.log($('#bikeParts').children());
        filterParts(button,'#bikeParts');
    });

    $('#TBPartSideNav>button').bind('click', function(button){
        filterParts(button,'#TopBoxPannierParts');
    });

    $('#sideNav4x4>button').bind('click',function(button){
        filterParts(button,'#Parts4x4');
    });

    //Filter bike Parts according to sidenav
    function filterParts(FiltCrit,RangeToFilter) {
        var fr = $(RangeToFilter).children();
        var crt = FiltCrit.target.id;
        fr.hide();
        var p = 0;
        fr.each(function(div){
            var idClass = fr[p].id.substr(0, fr[p].id.indexOf('_'));
            if(crt==idClass){
                $('#'+fr[p].id).fadeIn('slow');
            }
            //console.log('idClass '+idClass)
            //console.log('PartClass '+partClass)
            //console.log(parts[p].id)
            //console.log(p)
            p++;
        });
    }
});

