$(document).ready(() => {

    console.log('nav.loaded');
    $('#navTop').on('click', (ev) => {
        var brandName = $(ev.target).hasClass('navbar-brand');
        if (window.vpw <= 414) {
            navBarOperationM(ev);
        }
        if (!brandName) {
            navBarOperationD(ev.currentTarget, ev.target);
        }
    });

    let navBarOperationD = (container, targetEl) => {
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
    let navBarOperationM = ((ev) => {
        console.log(ev.target.id);

        if ($(ev.target).hasClass('dropdown-item') && (ev.target.id != 'srchM')) {
            console.log('true');
        }
    });
});