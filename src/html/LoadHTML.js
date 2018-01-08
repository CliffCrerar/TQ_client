//Load HTML into application
import navTopD from './navBarTopD.html';
import navTopM from './navBarTopM.html';
import land from './landing.html';
import catFrontPage from './catFrontPage.html';

var badge = require('../js/badges.js');
console.log(badge);
$('body').append('<div class="se-pre-con"></div>');
//Insert landing page HTML
if (window.vpw <= 414) {
    console.log(window.vpw);
    $('body').append(navTopM); //If screen size smaller than 414 then load mobile top nav
} else {
    console.log(window.vpw);
    $('body').append(navTopD); //else load normal nav html
}
$('body').append(land);
//Finish Window loading
window.onload = () => {
    setTimeout(() => {
        $('.se-pre-con').fadeOut();
    }, 500);
};