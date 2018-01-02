/* App root file */
console.log('Loading files');
import _ from 'lodash';

//Load CSS
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/landing.css';
import './css/nav.css';
import './css/font.css';
import './css/carousel.css';
import './css/adds.css';

//slick.carousel
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick.js';
import '../node_modules/slick-carousel/slick/slick-theme.css';

//Custom JS
import './js/landing.js';
import './js/nav.js';
import './js/dispTextLoader.js';
import './js/carousel.js';
import './js/adds.js';

//libs & nodes
import 'bootstrap';
import 'font-awesome-webpack';



//Landing Page load images into html
$(document).ready(() => {

});

//Add rail image import

//Adds rail image load
$(document).ready(() => {
    $('.addFade').slick({
        arrows: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

console.log('Index.loaded');