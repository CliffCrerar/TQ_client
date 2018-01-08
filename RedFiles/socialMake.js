$(document).ready(() => {
    var navBottomHeight = $('#navBottom').height();
    $('.makes').append('<img class="navBadge" src="' + bmwBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + landRoverBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + ktmBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + hondaBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + yamahaBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + triumphBadge + '">');
    $('.makes').append('<img class="navBadge" src="' + twinAfricaBadge + '">');
    if (window.vpw <= 414) {
        var nblen = $('.makes').children().length;
        var wid = $('.navBottom').width() / nblen;
        $('.makes').addClass('d-flex').addClass('justify-content-center');
        $('.navBadge').height(navBottomHeight - 5);
    } else {
        $('.navBadge').height(navBottomHeight);
    }
});