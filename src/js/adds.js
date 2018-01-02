//Add 1 const [propertyName] = arrayToDestruct;
import add11 from '../image/add1.1.jpg';
import add12 from '../image/add1.2.jpg';
import add13 from '../image/add1.3.jpg';


$(document).ready(() => {

    $('.add1_1').html('<img class="addImg" src=' + add11 + '>');
    $('.add1_2').html('<img class="addImg" src=' + add12 + '>');
    $('.add1_3').html('<img class="addImg" src=' + add13 + '>');

    var addsRailHeight = $('.addsRail').height();
    $('.add').css('height', addsRailHeight);

});