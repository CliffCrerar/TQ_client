$(document).ready(() => {

    console.log('nav.loaded');
    $('#navTop').on('click', (ev) => {
        var brandName = $(ev.target).hasClass('navbar-brand');
        console.log(brandName);
        if (window.vpw <= 414 && !brandName) {
            navBarOperationM(ev.currentTarget, ev.target);
            console.log('mobileNav');
        } else if (!brandName) {
            navBarOperationD(ev.currentTarget, ev.target);
            console.log('NotMobile');
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
    let navBarOperationM = ((container, targetEl) => {
        console.log('Check 4');

        //console.log(container);
        //console.log(targetEl);

        //console.log($('li.nav-item.dropdown'));

        if ($(targetEl).is('li')) {
            $('li.nav-item.dropdown').each((i, el) => {
                console.log(el);
                console.log(i);
                if (el.id !== 'navSearch') {
                    $(el).removeClass('active');
                }

            });
            if (targetEl.id !== 'navSearch') {
                $(targetEl).addClass('active');
            }
        }

    });


});