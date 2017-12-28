let correctDimension = () => {
    //Correction of image viewhight
    var vph;
    var vpw;
    var agentCheck = window.navigator.userAgent; //Get window data to determine browser
    //Define viewport for browser compatibility

    //Determine browser by looking at the DOM
    if (agentCheck.indexOf('Chrome') > 0) {
        agent = 'Chrome';
        vph = window.visualViewport.height;
        vpw = window.visualViewport.width;
    } else if (agentCheck.indexOf('Firefox') > 0) {
        agent = 'Firefox';
        vph = window.innerHeight;
        vpw = window.innerWidth;
    } else if (agentCheck.indexOf('Safari') > 0) {
        agent = 'Safari';
        vph = window.innerHeight;
        vpw = window.innerWidth;
    }
    console.log(agent, 'VPH:', vph, 'VPW:', vpw);
    console.log($('body'));
    $(document).ready(() => {
        if (vpw <= 320) {
            $('body').css("height", 800);
        } else {
            $('body').css("height", vph, (i, c) => {
                console.log(i);
                console.log(c);
            });
        }
    });
};

correctDimension();

$(document).ready(() => {
    $(window).resize(() => { correctDimension(); });
});

console.log('landing.loaded');