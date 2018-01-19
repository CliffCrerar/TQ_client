//Load HTML into application
const navTopD = require('./navBarTopD.html');
const navTopM = require('./navBarTopM.html');
const land = require('./landing.html');
const partsViewFP = require('./partsViewFP.html');
const partsView = require('./partsView.html');
const contactView = require('./contactView.html');

$('body').append('<div class="se-pre-con"></div>');
//Insert landing page HTML
if (window.vpw <= 414) {
    $('body').append(navTopM); //If screen size smaller than 414 then load mobile top nav
} else {
    //console.log(window.vpw);
    $('body').append(navTopD); //else load normal nav html
}
$('body').append(land);

module.exports = class {
    catFpBadge() {
        if (!$.contains(document.body, document.body.children.catFP)) {
            $('body').append(partsViewFP).fadeIn();
            $.each(badge, (name, link) => {
                $('.badgeImg[alt="' + name + '"]').attr('src', link);
            });
        } else {
            $('#catFP').fadeIn();
        }
    }
    partsViewShow(event) {
        if (event.target.id == "N_1" && $('body').find('#P_1').length == 0) {
            $('body').append(partsView);
        }
    }
    contactViewShow(event) {
        if (event.target.id == "N_2" && $('body').find('#P_2').length == 0) {
            $('body').append(contactView);

            $('#reqButton').on('click', (ev) => {
                console.log('request click');
                $('.tempResp').append('<p>Click</p>');
                $.ajax({
                    url: 'http://172.16.0.152:8000',
                    type: 'GET',
                    data: 'KTM',
                    success: function(response) {
                        console.log(response);
                        $('.tempResp').append(response);
                        var jsParts = JSON.parse(response);
                        console.log(jsParts);
                    },
                    error: function(error) {
                        alert('An error has occured');
                        console.log(error);
                    }
                });
            });
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