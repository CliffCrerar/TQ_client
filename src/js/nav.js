$(document).ready(() => {

    console.log('nav.loaded');
    $('#navTop').on('click', (ev) => {
        var brandName = $(ev.target).hasClass('navbar-brand');
        if (window.vpw <= 414 && !brandName) {
            navBarOperationM(ev.currentTarget, ev.target);
            console.log('mobileNav');
        } else if (!brandName) {
            navBarOperationD(ev.currentTarget, ev.target);
            console.log('NotMobile');
        }
        if (ev.target.id == 'N_1') {}
    });
    const navBarOperationD = (container, targetEl) => {
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
            pageIn.fadeIn();
        }
    };
    const navBarOperationM = (container, targetEl) => {
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
                pageIn.fadeIn();
            }
        }
    };
});