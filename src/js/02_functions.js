//Navigation bar operation class
module.exports = class {
    //for desktop nav
    navBarOperationD(container, targetEl) {
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
        }
        //for mobile nav
    navBarOperationM(container, targetEl) {
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
    }
};
console.log('02_functions.loaded');