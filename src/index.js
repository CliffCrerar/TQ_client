/* App root file */
console.log('Loading files');

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
import './js/dispTextLoader.js';
import './js/carousel.js';
import './js/adds.js';
import './js/socialMake.js';
import './js/htmlLoad.js';

//Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

//Font Awesome
import 'font-awesome-webpack';

//Slick.carousel
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick.js';
import '../node_modules/slick-carousel/slick/slick-theme.css';

//jQuery modules
import 'jquery/src/ajax';
import 'jquery/src/ajax/xhr';

$.ajax({
    url: './js/testJQLoad.html',
    cache: false,
    complete: function(jqXHR, textStatus) {
        console.log(textStatus);
        console.log(jqXHR);
    }
});



console.log('Index.loaded');