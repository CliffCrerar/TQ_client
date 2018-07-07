//Add1 Top boxes
import add11 from '../image/add1.1.jpg';
import add12 from '../image/add1.2.jpg';
import add13 from '../image/add1.3.jpg';
//Add2 panniers
import add21 from '../image/add2.1.jpg';
import add22 from '../image/add2.2.jpg';
import add23 from '../image/add2.3.jpg';
//Add3 brackets
import add31 from '../image/add3.1.jpg';
import add32 from '../image/add3.2.jpg';
import add33 from '../image/add3.3.jpg';
//Add4 bash plates
import add41 from '../image/add4.1.jpg';
import add42 from '../image/add4.2.jpg';
import add43 from '../image/add4.3.jpg';
//Add5 Top box pannier combos
import add51 from '../image/add5.1.jpg';
import add52 from '../image/add5.2.jpg';
import add53 from '../image/add5.3.jpg';
//Add6
import add61 from '../image/add6.1.jpg';
import add62 from '../image/add6.2.jpg';
import add63 from '../image/add6.3.jpg';

//COMING SOON
import CS from '../image/cs4.png';

var slickAddOptions = {
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    adaptiveHeight: true,
    mobileFirst: true
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
};

$(document).ready(() => {
    //Add rail options

    //Include add 1 in html
    $('.add1-1').html('<img class="addImg img-fluid" src="' + add11 + '">');
    $('.add1-2').html('<img class="addImg img-fluid" src="' + add12 + '">');
    $('.add1-3').html('<img class="addImg img-fluid" src="' + add13 + '">');
    //Include add 2 in html
    $('.add2-1').html('<img class="addImg img-fluid" src="' + add21 + '">');
    $('.add2-2').html('<img class="addImg img-fluid" src="' + add22 + '">');
    $('.add2-3').html('<img class="addImg img-fluid" src="' + add23 + '">');
    //Include add 3 in html
    $('.add3-1').html('<img class="addImg img-fluid" src="' + add31 + '">');
    $('.add3-2').html('<img class="addImg img-fluid" src="' + add32 + '">');
    $('.add3-3').html('<img class="addImg img-fluid" src="' + add33 + '">');
    //Include add 4 in html
    $('.add4-1').html('<img class="addImg img-fluid" src="' + add41 + '">');
    $('.add4-2').html('<img class="addImg img-fluid" src="' + add42 + '">');
    $('.add4-3').html('<img class="addImg img-fluid" src="' + add43 + '">');
    //Include add 5 in html
    $('.add5-1').html('<img class="addImg img-fluid" src="' + add51 + '">');
    $('.add5-2').html('<img class="addImg img-fluid" src="' + add52 + '">');
    $('.add5-3').html('<img class="addImg img-fluid" src="' + add53 + '">');
    //Include add 6 in html
    $('.add6-1').html('<img class="addImg img-fluid" src="' + add61 + '">');
    $('.add6-2').html('<img class="addImg img-fluid" src="' + add62 + '">');
    $('.add6-3').html('<img class="addImg img-fluid" src="' + add63 + '">');
    // Activate slick
    if (vpw > 414) {
        $('.addFade').slick(slickAddOptions);
    }
    $('#ac5').append('<div class="imgCS"><img class="imgCs img-fluid" src="'+CS+'">');

});
//console.log('04_adds.loaded');