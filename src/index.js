/* App root file */
console.log('Loading files');
import _ from 'lodash';

//Load CSS
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/landing.css';
import './css/nav.css';
import './css/font.css';
import './css/carousel.css';


//Custom JS
import './js/landing.js';
import './js/nav.js';
import './js/dispTextLoader.js';
import './js/carouselImages.js';

//libs & nodes
import 'bootstrap';
import 'font-awesome-webpack';

//image
import carimage1 from './image/car_image1.jpg';
import carimage2 from './image/car_image2.jpg';
import carimage3 from './image/car_image3.jpg';
import carimage4 from './image/car_image4.jpg';
//Load images into html

$(document).ready(() => {
    $('#carouselSlide1>img').attr('src', carimage1);
    $('#carouselSlide2>img').attr('src', carimage2);
    $('#carouselSlide3>img').attr('src', carimage3);
    $('#carouselSlide4>img').attr('src', carimage4);
});


console.log('Index.loaded');