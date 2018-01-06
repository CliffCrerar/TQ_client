//Import badges
import bmwBadge from '../image/badge/bmw.png';
import landRoverBadge from '../image/badge/landrover.png';
import ktmBadge from '../image/badge/ktm.png';
import hondaBadge from '../image/badge/honda.png';
import yamahaBadge from '../image/badge/yamaha.png';
import triumphBadge from '../image/badge/triumph1.jpg';
import twinAfricaBadge from '../image/badge/africatwin1.png';

$(document).ready(() => {
    var navBottomHeight = $('#navBottom').height();

    $('.makes').append('<img class="navBadge" src="' + bmwBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + landRoverBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + ktmBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + hondaBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + yamahaBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + triumphBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + twinAfricaBadge + '">');
    /*
    if (vpw <= 414) {
        var nblen = $('.makes').children().length;
        console.log(nblen);
        var wid = $('.navBottom').width() / nblen;
        $('.makes').addClass('d-flex').addClass('justify-content-center');
        $('.navBadge').height(navBottomHeight - 5);
    } else {
        $('.navBadge').height(navBottomHeight);
    }
    */
    correctDimension(window.vph, window.vpw);

});