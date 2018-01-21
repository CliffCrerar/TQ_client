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

// functions class for loading page sections
module.exports = class {
    partsViewFP() { // function that loads partsview front page and its attached event handlers

        if (!$.contains(document.body, document.body.children.partsViewFP)) { //if partsview frontpage not loaded
            $('body').append(partsViewFP).fadeIn(); //append html to body
            // get badge pics and load
            $.each(badge, (name, link) => {
                $('.badgeImg[alt="' + name + '"]').attr('src', link); // load badges into partsViewFP
            });
            // badge click event
            $('#partsViewFP').on('click', (ev) => {
                console.log(ev.target.id);

            });

        } else { // else if partsfront page already loaded
            $('#partsViewFP').fadeIn();
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

            var url1 = 'http://172.20.10.3:8000';
            var url2 = 'http://172.16.0.152:8000';
            // TEMP CODE START
            $('#reqButton').on('click', (ev) => {
                console.log('request click');
                $('.tempResp').append('<p>Click</p>');
                $.ajax({
                    url: url1,
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
            // TEMP CODE END
        }
    }
};
// Finish Window loading
window.onload = () => {
    setTimeout(() => {
        $('.se-pre-con').fadeOut();
    }, 500);
};
console.log('LoadHTML.loaded');