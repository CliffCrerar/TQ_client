//Import badges
console.log('badges.load');
//var bmwBadge = require('../image/badge/bmw.png');
var landRoverBadge = require('../image/badge/landrover.png');
var ktmBadge = require('../image/badge/ktm.png');
var hondaBadge = require('../image/badge/honda.png');
var yamahaBadge = require('../image/badge/yamaha.png');
var triumphBadge = require('../image/badge/triumph1.jpg');
var twinAfricaBadge = require('../image/badge/africatwin1.png');

var badge = {
    "bmw": landRoverBadge,
    "lanRover": landRoverBadge,
    "ktm": ktmBadge,
    "honda": hondaBadge,
    "yamaha": yamahaBadge,
    "triumph": triumphBadge,
    "twinAfrica": twinAfricaBadge
};

module.exports = badge;

//Insert badges
$(document).ready(() => {
    var navBottomHeight = $('#navBottom').height();

    if (window.vpw <= 414) {
        var nblen = $('.makes').children().length;
        var wid = $('.navBottom').width() / nblen;
        $('.makes').addClass('d-flex').addClass('justify-content-center');
        $('.navBadge').height(navBottomHeight - 5);
    } else {
        $('.navBadge').height(navBottomHeight);
    }
});