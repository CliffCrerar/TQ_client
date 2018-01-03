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

$(document).ready(() => {

    //Include add 1 in html
    $('.add1_1').html('<img class="addImg" src="' + add11 + '">');
    $('.add1_2').html('<img class="addImg" src="' + add12 + '">');
    $('.add1_3').html('<img class="addImg" src="' + add13 + '">');
    //Include add 2 in html
    $('.add2_1').html('<img class="addImg" src="' + add21 + '">');
    $('.add2_2').html('<img class="addImg" src="' + add22 + '">');
    $('.add2_3').html('<img class="addImg" src="' + add23 + '">');
    //Include add 3 in html
    $('.add3_1').html('<img class="addImg" src="' + add31 + '">');
    $('.add3_2').html('<img class="addImg" src="' + add32 + '">');
    $('.add3_3').html('<img class="addImg" src="' + add33 + '">');
    //Include add 4 in html
    $('.add4_1').html('<img class="addImg" src="' + add41 + '">');
    $('.add4_2').html('<img class="addImg" src="' + add42 + '">');
    $('.add4_3').html('<img class="addImg" src="' + add43 + '">');
    //Include add 5 in html
    $('.add5_1').html('<img class="addImg" src="' + add51 + '">');
    $('.add5_2').html('<img class="addImg" src="' + add52 + '">');
    $('.add5_3').html('<img class="addImg" src="' + add53 + '">');
    //Include add 6 in html
    $('.add6_1').html('<img class="addImg" src="' + add61 + '">');
    $('.add6_2').html('<img class="addImg" src="' + add62 + '">');
    $('.add6_3').html('<img class="addImg" src="' + add63 + '">');

    //Adjust image height
    var addHeight;
    if (window.vpw <= 320) {
        addHeight = 160;
        console.log(addHeight)
        $('.addFade').css('height', addHeight);
        $('.add>img').css('height', addHeight);
        $('.add').css('width', 'auto');
    } else {
        addHeight = $('.addsRail').height();
        $('.add').css('height', addHeight);
    }

    //Add rail options
    $('.addFade').slick({
        arrows: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object

    });
});

console.log('adds.loaded');