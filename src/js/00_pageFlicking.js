module.exports = class {
    D(ev) {
        $('.nav-item').each((i, el) => {
            var pageIn = '#P-' + ev.target.id.split('-')[1];
            var active = $(el).hasClass('active');
            if (active) {
                var pageOut = '#P-' + el.id.split('-')[1];
                //console.log('fadeOut');
                $(pageOut).fadeOut('500', 'swing', () => {
                    //console.log('fadeIn');
                    setTimeout(() => {
                        $(pageIn).fadeIn('500', 'swing');
                    }, 200);
                });
            }
        });
    }
    M(ev) {
        console.log(ev.target);
        console.log($('.nav-item'));
    }
};

/* PAGE NAVIGATION ACTIONS
Promise.resolve($('body').append(loadNav(vpw)))
    .then(() => {
        // THIS IS FOR SPECIAL NAVBAR OPERATIONS DESKTOP & MOBILE
        $('#N-0').on('click', (ev) => {
            console.log('HOME BUTTON');
            $('#P-0').fadeIn();
            if ($('#N-1').hasClass('active')) {
                $('#P-1').fadeOut();
            }
            if ($('#N-2').hasClass('active')) {
                $('#P-2').fadeOut();
            }
            $('#accordion').empty();
            $('#left').empty();
            $('#partsViewContainerM').empty();
            $('#filterDropDownM').remove();
            $('#partsViewContainer').css('display', 'none');
            $('#partsViewContainerM').css('display', 'none');
            $('#partsViewFP').css('display', 'none');
        });
        $('#N-1').on('click', (ev) => {
            console.log('PARTS CAT BUTTON');
            //require('./js/00_resetViews');
            $('#P-1').fadeIn();
            if ($('#N-0').hasClass('active')) {
                $('#P-0').fadeOut();
            }
            if ($('#N-2').hasClass('active')) {
                $('#P-2').fadeOut();
            }
            $('#partsViewFP').css('display', 'inherit');
            $('#partsViewContainer').css('display', 'none');
            $('#partsViewContainerM').css('display', 'none');
            $('#accordion').empty();
            $('#left').empty();
            $('#partsViewContainerM').empty();
            $('#filterDropDownM').remove();
        });
        $('#N-2').on('click', (ev) => {
            $('#P-2').fadeIn();
            if ($('#N-0').hasClass('active')) {
                $('#P-0').fadeOut();
            }
            if ($('#N-1').hasClass('active')) {
                $('#P-1').fadeOut();
            }
            $('#accordion').empty();
            $('#left').empty();
            $('#partsViewContainerM').empty();
            $('#filterDropDownM').remove();
            $('#partsViewContainer').css('display', 'none');
            $('#partsViewContainerM').css('display', 'none');
            $('#partsViewFP').css('display', 'none');
            $('#navBottom').empty();
            Promise.resolve($('#navBottom').append(require('./html/navBarBottomAbout.html')))
                .then(() => {
                    console.log(devLogo);
                    $('#devLogo').attr('src', devLogo);
                });
        });
        // FOR MOBILE
        $('.navbar-toggler').click((ev) => {
            if ($('#navbarSupportedContent').hasClass('show')) {
                $('#navbarSupportedContent').removeClass('show');
            }
        });
    });
*/