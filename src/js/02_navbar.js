//Navigation bar operation class

// for desktop nav
let navBarOperationD = (container, targetEl) => {
    if (!($(targetEl).hasClass('active'))) {
        $(container).children('a').each((i, el) => {
            if ($(el).hasClass('active')) {
                var pageOut = $('#P_' + el.id.split('_')[1]);
                pageOut.fadeOut('slow');
                $(el).removeClass('active');
            }
        });
        $(targetEl).addClass('active');
        $('body').css("height", window.vph);
        var pageIn = $('#P_' + targetEl.id.split('_')[1]);
        pageIn.fadeIn('slow');
    }
};
// for mobile nav
let navBarOperationM = (container, targetEl) => {
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

const partsViewFP = require('../html/partsViewFP.html'); // get parts view front page html
let partsViewFPOps = () => { // function that loads partsview front page and its attached event handlers
    if (!$.contains(document.body, document.body.children.P_1)) { //if partsview frontpage not loaded
        $('body').append(partsViewFP).fadeIn(); //append html to body
        // get badge pics and load
        $.each(badge, (name, link) => {
            $('.badgeImg[alt="' + name + '"]').attr('src', link); // load badges into partsViewFP
        });
        var partwViewFPClick = require('./06_loadPVMain.js');
        $('#partsViewFP').on('click', (ev) => {
            //console.log('click', ev);
            partsViewFPClick(ev);
        });
    } else { // else if partsfront page already loaded
        $('#partsViewFP').fadeIn(); // fade in partsview frontpage
        $('#partsViewContainer').fadeOut();
    }
};

const contactView = require('../html/contactView.html');
let contactViewShow = (event) => {
    if (event.target.id == "N_2" && $('body').find('#P_2').length == 0) {
        $('body').append(contactView);
    }
};

// Nav bar click

$('#navTop').on('click', (ev) => {
    console.log('click');
    //Navbar click function
    var brandName = $(ev.target).hasClass('navbar-brand');
    if (window.vpw <= 414 && !brandName) {
        navBarOperationM(ev.currentTarget, ev.target);
    } else if (!brandName) {
        navBarOperationD(ev.currentTarget, ev.target);
    }
    if (ev.target.id == 'N_1') {
        partsViewFPOps();
    } else {
        $('#partsViewFP').fadeOut();
    }
    contactViewShow(ev);

});
console.log('02_navbar.loaded');