module.exports = (ev) => {
    $('.nav-item').each((i, el) => {
        var pageIn = '#P-' + ev.target.id.split('-')[1];
        var active = $(el).hasClass('active');
        if (active) {
            $(el).removeClass('active');
            var pageOut = '#P-' + el.id.split('-')[1];
            let pfSub = require('./00_pfsubmod');
            pfSub();
            $(pageOut).fadeOut('500', 'swing', () => {
                setTimeout(() => {
                    $(pageIn).fadeIn('500', 'swing');
                    if (pageIn == '#P-1') {
                        $('#partsViewFP').css('display', 'inherit');
                    }
                }, 200);
            });
        }
    });
    //console.log(ev.target.id);
    $('#'+ev.target.id).addClass('active');
};


/* PAGE NAVIGATION ACTIONS
Promise.resolve($('body').append(loadNav(vpw)))
    .then(() => {
        // THIS IS FOR SPECIAL NAVBAR OPERATIONS DESKTOP & MOBILE
        $('#N-0').on('click', (ev) => {
 
        });
        $('#N-1').on('click', (ev) => {
            $('#partsViewFP').css('display', 'inherit');
        });
        $('#N-2').on('click', (ev) => {
        });
    });
*/