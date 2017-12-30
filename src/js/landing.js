let correctDimension = () => {
    //Correction of image viewhight    
    var agentCheck = window.navigator.userAgent; //Get window data to determine browser
    //Define viewport for browser compatibility

    //Determine browser by looking at the DOM
    if (agentCheck.indexOf('Chrome') > 0) {
        agent = 'Chrome';
        window.vph = window.visualViewport.height;
        window.vpw = window.visualViewport.width;
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

    //console.log(agent, 'VPH:', vph, 'VPW:', vpw);
    //console.log($('body'));
    $(document).ready(() => {
        if (vpw <= 320) {
            $('body').css("height", 800);
            $('#carousellID').css("height", "44%");
            $('#addsRailID').css("height", "44%");
            $('.sideNav').remove();
            $('.cat').removeClass('col-10').css('width', "100%");
        } else {
            $('body').css("height", window.vph);
            /*
            let spaceToFill = () => {
                var accumulator;
                var nav = Math.ceil($('#navTop').height());
                var car = Math.ceil($('#carousellID').height());
                var soc = Math.ceil($('#abSocID').height());
                accumulator = nav + car + soc;
                $('.buffer').each((i, el) => {
                    accumulator += Math.ceil($(el).height());
                });
                return (vph - accumulator)
            };
            console.log(spaceToFill());
            $('#addsRailID').css("height", spaceToFill());
            */
        }
    });

};

correctDimension();

$(document).ready(() => {
    $(window).resize(() => { correctDimension(); });
});

console.log('landing.loaded');