//function that corrects dimensions for elements to fit accordingly
console.log('loading Started')
    //getElementByName(window).onLoad(function() {
    //  console.log("SCREEN LOADED")
    //$(".se-pre-con").fadeOut("slow");
    //});
let correctDimension = function(vph, vpw) {
    //Correction of image viewhight   
    console.log(agent, 'VPH:', vph, 'VPW:', vpw);
    //console.log($('body'));
    $(document).ready(() => {
        //var navH = 0;
        //var navM = 0;
        //var newHeight = 0;
        var newHeight;
        $('body').css('background-Size', vph + 'px auto');
        if (vpw <= 414) {

            subract = $('#navTop').height();
            newHeight = 690 - subract;
            $('#P_0').css('height', newHeight);

            $('.lpCarousel').hide();
            $('.c1.carousel-inner').css('border-radius', '24px');

            newHeight = $('.addsRail').height() + 20;

            $('#addsRailID').css("height", "88%");
            $('.addContainer').css('height', newHeight);
            //$('.addFade').css('height', newHeight);
            $('.add').css('height', newHeight);
            $('.addImg').css('height', newHeight);

            $('.navbar-brand').css('width', '100%').addClass('text-center');

            var social = $('.social').clone();

            $('.social').remove();


            $('.makes').css('width', '100%');

        } else {
            $('body').css("height", vph);

            var navH = ($('#navTop').height());
            var navM = parseInt($('#navTop').css('margin-top'), 10);

            newHeight = vph - navH - navM;
            $('#P_0').css('height', newHeight);

            var addHeight = $('.addsRail').height();
            $('.add').css('height', addHeight);
        }
    });
};

var agentCheck = window.navigator.userAgent; //Get window data to determine browser
//Define viewport for browser compatibility

//Determine browser by looking at the DOM
if (agentCheck.indexOf('Chrome') > 0) {
    agent = 'Chrome';
    window.vph = window.top.innerHeight;
    window.vpw = window.top.innerWidth;
} else if (agentCheck.indexOf('Firefox') > 0) {
    agent = 'Firefox';
    window.vph = window.top.innerHeight;
    window.vpw = window.top.innerWidth;
    //window.scrollbars = false;
} else if (agentCheck.indexOf('Safari') > 0) {
    agent = 'Safari';
    window.vph = window.top.innerHeight;
    window.vpw = window.top.innerWidth;
}

correctDimension(window.vph, window.vpw);

$(document).ready(() => {
    $(window).resize(() => { correctDimension(window.vph, window.vpw); });
});

console.log('landing.loaded');