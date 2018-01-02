/* App root file */
console.log('Loading files');
import _ from 'lodash';

//Load CSS
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/landing.css';
import './css/nav.css';
import './css/font.css';
import './css/carousel.css';


//slick.carousel
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick.js';
import '../node_modules/slick-carousel/slick/slick-theme.css';

//Custom JS
import './js/landing.js';
import './js/nav.js';
import './js/dispTextLoader.js';
import './js/carousel.js';

//libs & nodes
import 'bootstrap';
import 'font-awesome-webpack';

//image
import carimage1 from './image/car_image1.jpg';
import carimage2 from './image/car_image2.jpg';
import carimage3 from './image/car_image3.jpg';
import carimage4 from './image/car_image4.jpg';
import carimage5 from './image/car_image5.jpg';
import carimage6 from './image/car_image6.jpg';
//Load images into html

$(document).ready(() => {
    $('#slide1').attr('src', carimage1);
    $('#slide2').attr('src', carimage2);
    $('#slide3').attr('src', carimage3);
    $('#slide4').attr('src', carimage4);
    $('#slide5').attr('src', carimage5);
    $('#slide6').attr('src', carimage6);

    $('.slickCarousel').slick({
        arrows: true,
    });
});

console.log('Index.loaded');