//Landing Page Carousel image
import carimage1 from '../image/car_image1.jpg';
import carimage2 from '../image/car_image2.jpg';
import carimage3 from '../image/car_image3.jpg';
import carimage4 from '../image/car_image4.jpg';
import carimage5 from '../image/car_image5.jpg';
import carimage51 from '../image/car_image5_1.jpg';
import carimage6 from '../image/car_image6.jpg';
import carimage61 from '../image/car_image6_1.jpg';
import carimage7 from '../image/car_image7.jpg';
import carimage71 from '../image/car_image7_1.jpg';
import carimage8 from '../image/car_image8.jpg';
import carimage81 from '../image/car_image8_1.jpg';
import carimage9 from '../image/car_image9.jpg';

$(document).ready(() => {
    //Load images
    $('#slide1>img').attr('src', carimage1);
    $('#slide2>img').attr('src', carimage2);
    $('#slide3>img').attr('src', carimage3);
    $('#slide4>img').attr('src', carimage4);
    $('#slide5>img').attr('src', carimage5);
    $('#slide51>img').attr('src', carimage51);
    $('#slide6>img').attr('src', carimage6);
    $('#slide61>img').attr('src', carimage61);
    $('#slide7>img').attr('src', carimage7);
    $('#slide71>img').attr('src', carimage71);
    $('#slide8>img').attr('src', carimage8);
    $('#slide81>img').attr('src', carimage81);
    $('#slide9>img').attr('src', carimage9);

    //Landing Page Carousel Settings
    $('.slickCarousel').slick({
        arrows: false,
        infinite: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        variableWidth: true,
        pauseOnHover: false
    });

    //Other dimension adjustments
    var lpCarHeight = ($('.lpCarousel').height());
    var lpCarWidth = ($('.lpCarousel').width());
    var carDim = function() {
        $('.slickCarousel').css('height', lpCarHeight);
        $('.slickSlide').css('height', lpCarHeight);
        $('.moto').css('min-width:', lpCarWidth);
    };
    carDim();
    $(window).resize(function() {
        carDim();
    });

    console.log('carousel.loaded');
});