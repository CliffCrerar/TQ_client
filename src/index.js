/* App root file */
console.log('Loading files');
import _ from 'lodash';

//Load CSS
import './css/landing.css';
import './css/nav.css';
import './css/font.css';
import './css/carousel.css';
import './css/adds.css';
import './css/makeSocial.css';

//Custom JS
import './js/landing.js';
import './js/nav.js';
import './js/dispTextLoader.js';
import './js/carousel.js';
import './js/adds.js';

//Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

//Font Awesome
import 'font-awesome-webpack';

//Slick.carousel
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick.js';
import '../node_modules/slick-carousel/slick/slick-theme.css';

//Add rail image import



console.log('Index.loaded');