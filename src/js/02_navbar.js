//Navigation bar operation class
module.exports = {
    navBarOperationD(container, targetEl) {
        //console.log('NAV_D');
        if (!($(targetEl).hasClass('active'))) {
            $(container).children('a').each((i, el) => {
                if ($(el).hasClass('active')) {
                    var pageOut = $('#P_' + el.id.split('_')[1]);
                    pageOut.fadeOut();
                    $(el).removeClass('active');
                }
            });
            $(targetEl).addClass('active');
            $('body').css("height", window.vph);
            var pageIn = $('#P_' + targetEl.id.split('_')[1]);
            pageIn.fadeIn().css('height', $('#pageCont').height());
        }
    },
    // for mobile nav
    navBarOperationM(container, targetEl) {
        //console.log('NAV_M');
        if ($(targetEl).is('li')) {
            $('li.nav-item.dropdown').each((i, el) => {
                if (el.id !== 'navSearch') {
                    var pageOut = $('#P_' + el.id.split('_')[1]);
                    pageOut.fadeOut();
                    $(el).removeClass('active');
                }
            });
            if (targetEl.id !== 'navSearch') {
                $(targetEl).addClass('active');
                $('body').css("height", window.vph);
                var pageIn = $('#P_' + targetEl.id.split('_')[1]);
                pageIn.fadeIn().css('height', $('#pageCont').height());
            }
        }
        $('.navbar-collapse').collapse('toggle');
        $('#pageCont').css('height', $('#P_' + targetEl.id.split('_')[1]).height());
    },
};
//console.log('02_navbar.loaded');