/* App root file */
console.log('Loading files');
$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">');
//Lodash
import _ from 'lodash';
//handleBars

//Load CSS
import './css/landing.css';
import './css/nav.css';
import './css/font.css';
import './css/carousel.css';
import './css/adds.css';
import './css/socialMake.css';
import './css/bg.css';
import './css/catFrontPage.css';

//Custom JS
import './js/landing.js';
import './js/nav.js';
import './js/carousel.js';
import './js/adds.js';
import './html/LoadHTML.js';
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


console.log('Index.loaded');