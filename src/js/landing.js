//function that corrects dimensions for elements to fit accordingly
let correctDimension = function(vph, vpw) {
    //Correction of image viewhight   
    //console.log(agent, 'VPH:', vph, 'VPW:', vpw);
    //console.log($('body'));
    $(document).ready(() => {
        var navH = 0;
        var navM = 0;
        var newHeight = 0;
        if (vpw <= 320) {
            $('body').css("height", 800);
            subract = $('#navTop').height();
            newHeight = 800 - subract;
            $('#P_0').css('height', newHeight);
            $('#carousellID').css("height", "44%");
            $('#addsRailID').css("height", "44%");
            $('.sideNav').remove();
            $('.buffer').remove();
            $('.cat').removeClass('col-10').css('width', "100%");
            $('body').removeClass('container-fluid');
            $('#P_0').removeClass('container-fluid');
            $('.c1.carousel-inner').css('border-radius', '24px');
        } else {
            $('body').css("height", vph);

            navH = ($('#navTop').height());
            navM = parseInt($('#navTop').css('margin-top'), 10);

            console.log('vph', vph);
            console.log('navH', navH);
            console.log('navM', navM);
            console.log('newHeight', newHeight);

            newHeight = vph - navH - navM;
            $('#P_0').css('height', newHeight);
        }
    });
};

var agentCheck = window.navigator.userAgent; //Get window data to determine browser
//Define viewport for browser compatibility

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

correctDimension(window.vph, window.vpw);

$(document).ready(() => {
    $(window).resize(() => { correctDimension(); });
});

console.log('landing.loaded');