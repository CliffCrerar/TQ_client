$(document).ready(function(){

    //console.log('nav');
    
    //Hide HTML part description containers 
    $('#TopBoxPannier').hide();
    $('#bikes').hide();
    $('#4x4').hide();
    $('#contact').hide();

    /* navbar functions */
    //$('.nav-tabs').children().css('color','black');

    //On click event that makes the home page active
    $('a:contains("Home")').click(function(){
        remActiveTab();
        $('.nav-tabs').children()[0].setAttribute('class','active');
        $('#home').show();
    });

    //Onclick ever that makest the top box and panniers page active
    $('a:contains("Top")').click(function(){
        remActiveTab();
        $('.nav-tabs').children()[1].setAttribute('class','active');
        $('#TopBoxPannier').show();
        
        var sortList = $('#TopBoxPannierParts');
        sortItems(sortList);
    });

    //On click event that makes the bike parts page active
    $('a:contains("Bike")').click(function(){
        remActiveTab();
        $('.nav-tabs').children()[2].setAttribute('class','active');
        $('#bikes').show();
        
        var sortList = $('#bikeParts');
        sortItems(sortList);
    });

    //On click event that makes the 4x4 page active
    $('a:contains("4x4")').click(function(){
        remActiveTab();
        $('.nav-tabs').children()[3].setAttribute('class','active');
        $('#4x4').show();

        var sortList = $('#Parts4x4');
        sortItems(sortList);                    
    });

    //On click event that makes the contact us page active
    $('a:contains("Contact")').click(function(){
        remActiveTab();
        $('.nav-tabs').children()[4].setAttribute("class", "active");
        $('#contact').show();
    });

    //console.log($('.nav-tabs').children().length);

    //Function that hides all navigation headings, used in on-click events
    function remActiveTab(){
        var i = 0;
        $('.nav-tabs').children().each(function(li) {
            if ($('.nav-tabs').children()[i].className == 'active') {
                $('.nav-tabs').children()[i].removeAttribute('class');
                switch(i) {
                    case 0: $('#home').hide(); break;
                    case 1: $('#TopBoxPannier').hide(); break;
                    case 2: $('#bikes').hide(); break;
                    case 3: $('#4x4').hide(); break;
                    case 4: $('#contact').hide(); break;
                }                           
            }
            i++;
        });
    }

});