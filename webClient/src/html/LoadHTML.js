//Load HTML into application
const navTopD = require('./navBarTopD.html');
const navTopM = require('./navBarTopM.html');
const land = require('./landing.html');
const catFrontPage = require('./catFrontPage.html');
const partsView = require('./partsView.html');
const contactView = require('./contactView.html');

$('body').append('<div class="se-pre-con"></div>');
//Insert landing page HTML
if (window.vpw <= 414) {
    $('body').append(navTopM); //If screen size smaller than 414 then load mobile top nav
} else {
    console.log(window.vpw);
    $('body').append(navTopD); //else load normal nav html
}
$('body').append(land);

//event html load
module.exports = class {
    //Load category front page
    catFpBadge() {
        if (!$.contains(document.body, document.body.children.catFP)) {
            $('body').append(catFrontPage).fadeIn();
            $.each(badge, (name, link) => {
                $('.imgCatFp[alt="' + name + '"]').attr('src', link);
            });
        } else {
            $('#catFP').fadeIn();
        }
    }
};
module.exports = class {
    partsViewShow(event) {
        if (event.target.id == "N_1" && $('body').find('#P_1').length == 0) {
            $('body').append(partsView);
        }
    }

    contactViewShow(event) {
        if (event.target.id == "N_2" && $('body').find('#P_2').length == 0) {
            $('body').append(contactView);
        }
    }
};
//Finish Window loading
window.onload = () => {
    setTimeout(() => {
        $('.se-pre-con').fadeOut();
    }, 500);
};
console.log('LoadHTML.loaded')