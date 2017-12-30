$(document).ready(() => {

    var navBarBrand = '*BrandName*';

    console.log('nav.loaded')
    $('#navTop').on('click', (ev) => {
        var brandName = $(ev.target).hasClass('navbar-brand')
        if (brandName) {
            navBarOperation(ev.currentTarget, ev.target);
        }
    });

    let navBarOperation = (container, targetEl) => {
        if (!($(targetEl).hasClass('active'))) {
            $(container).children().each((i, el) => {
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
});