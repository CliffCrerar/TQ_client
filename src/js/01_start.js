//function that corrects dimensions for elements to fit accordingly
window.vph = window.innerHeight;
window.vpw = screen.width;
console.log("SCR_W: ", vph, "SCR_H: ", vpw);
let correctDimension = function(vph, vpw) {
    //Correction of image viewhight   
    console.log('VPH:', vph, 'VPW:', vpw);
    $(document).ready(() => {
        var newHeight;
        var addHeight;
        $('body').css('background-Size', vph + 'px auto');
        if (vpw <= 414) {
            subract = $('#navTop').height();
            newHeight = (vph * 0.86)
                // $('.lpCarousel').remove();
            $('.c1.carousel-inner').css('border-radius', '24px');
            //newHeight = $('.addsRail').height() + 5;
            //$('.pageCont').css('height', newHeight);
            addHeight = (vph * 0.85);
            $('#P_0').css("height", addHeight);
            $('#addsRailID').css("min-height", addHeight);
            $('.subRails').css('min-height', addHeight);
            $('.addContainer').css('height', addHeight / 3);
            $('.add').css('height', $('.addContainer').height());
            $('.addImg').css('height', $('.addContainer').height());
            $('.navbar-brand').css('width', '100%').addClass('text-center');
            $('.makes').css('width', '100%');
        } else {
            $('body').css("height", vph);
            var navH = ($('#navTop').height());
            var navM = parseInt($('#navTop').css('margin-top'));
            newHeight = vph - navH - navM;
            //$('#P_0').css('height', newHeight);
            addHeight = $('.addsRail').height();
            $('.add').css('height', addHeight);
        }
    });
};

var agentCheck = window.navigator.userAgent; //Get window data to determine browser
var agent;

correctDimension(vph, vpw);

console.log('VPH:', vph, 'VPW:', vpw);

$(document).ready(() => {
    $(window).resize(() => { correctDimension(window.vph, window.vpw); });
    //Load badge sources into images from badge object
    var badge = require('./05_badges.js');
    $.each(badge, (name, link) => {
        $('.makes>[alt="' + name + '"]').attr('src', link);
    });

    //adjust height for navbottom
    var navBottomHeight = $('#navBottom').height();
    if (vpw <= 414) {
        $('.navBadge').height(navBottomHeight - 5);
    } else {
        $('.navBadge').height(navBottomHeight);
    }
});

console.log('01_start.loaded');