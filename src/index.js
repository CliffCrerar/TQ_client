/* App root file */
console.log('Loading files');

$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
$('body').append('<div class="se-pre-con"></div>');

import _ from 'lodash';

//Load CSS
import './css/landing.css';
import './css/nav.css';
import './css/font.css';
import './css/carousel.css';
import './css/adds.css';
import './css/socialMake.css';
import './css/bg.css';

//Custom JS
import './js/landing.js';
import './js/nav.js';
import './js/carousel.js';
import './js/adds.js';
import './js/socialMake.js';

//Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

//Font Awesome
import 'font-awesome-webpack';

//Slick.carousel
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick.js';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import { setTimeout } from 'timers';

//Load HTML into application
import navTopD from './HTML/navBarTopD.html';
import navTopM from './HTML/navBarTopM.html';
import land from './HTML/landing.html';


if (window.vpw <= 414) {
    $('body').append(navTopM); //If screen size smaller than 414 then load mobile top nav
} else {
    $('body').append(navTopD); //else load normal nav html
}

$('body').append(land);

//Insert landing page HTML

//Finish Window loading
window.onload = () => {
    setTimeout(() => {
        $('.se-pre-con').fadeOut();
    }, 500);
};

console.log('Index.loaded');