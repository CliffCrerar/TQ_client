//function that corrects dimensions for elements to fit accordingly
let correctDimension = function(vph, vpw) {
    //Correction of image viewhight   
    console.log(agent, 'VPH:', vph, 'VPW:', vpw);
    $(document).ready(() => {
        var newHeight;
        $('body').css('background-Size', vph + 'px auto');
        if (window.vpw <= 414) {
            subract = $('#navTop').height();
            newHeight = 690 - subract;
            $('#P_0').css('height', newHeight);
            $('.lpCarousel').hide();
            $('.c1.carousel-inner').css('border-radius', '24px');
            newHeight = $('.addsRail').height() + 5;
            $('#addsRailID').css("height", "85%");
            $('.addContainer').css('height', newHeight);
            $('.addFade').css('height', newHeight);
            $('.add').css('height', newHeight);
            $('.addImg').css('height', newHeight);
            $('.navbar-brand').css('width', '100%').addClass('text-center');
            $('.social').remove();
            $('.makes').css('width', '100%');
        } else {
            $('body').css("height", vph);
            var navH = ($('#navTop').height());
            var navM = parseInt($('#navTop').css('margin-top'));
            newHeight = vph - navH - navM;
            $('#P_0').css('height', newHeight);
            var addHeight = $('.addsRail').height();
            $('.add').css('height', addHeight);
        }
    });
};

var agentCheck = window.navigator.userAgent; //Get window data to determine browser
var agent;
//Define viewport for browser compatibility

/*
//Determine browser by looking at the DOM
if (agentCheck.indexOf('Chrome') > 0) {
    agent = 'Chrome';
    window.vph = window.innerHeight;
    window.vpw = window.innerWidth;
} else if (agentCheck.indexOf('Firefox') > 0) {
    agent = 'Firefox';
    window.vph = window.innerHeight;
    window.vpw = window.innerWidth;
    //window.scrollbars = false;
} else if (agentCheck.indexOf('Safari') > 0) {
    agent = 'Safari';
    window.vph = window.innerHeight;
    window.vpw = window.innerWidth;
}
*/
window.vpw = screen.availWidth;
window.vph = screen.availHeight;
correctDimension(window.vph, window.vpw);

console.log(agent, 'VPH:', vph, 'VPW:', vpw);

$(document).ready(() => {
    $(window).resize(() => { correctDimension(window.vph, window.vpw); });
    //Load badge sources into images from badge object
    var badge = require('./05_badges.js');
    $.each(badge, (name, link) => {
        $('.makes>[alt="' + name + '"]').attr('src', link);
    });

    //adjust height for navbottom
    var navBottomHeight = $('#navBottom').height();
    if (window.vpw <= 414) {
        $('.navBadge').height(navBottomHeight - 5);
    } else {
        $('.navBadge').height(navBottomHeight);
    }
});

// load starting/home/landing page html
//const navTopD = require('../html/navBarTopD.html');
//const navTopM = require('../html/navBarTopM.html');
//const land = require('../html/landing.html');
if (window.vpw <= 414) {
    $('#navTop').remove(); // remove current navbar
    $('body').append(navTopM); //If screen size smaller than 414 then load mobile top nav
}
//$('body').append(land);

console.log('01_start.loaded');