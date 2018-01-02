/*  This file keeps all data about html display text  */

// 1.define display text for navbar
var navBarBrand = 'TQ Bike & 4x4 Accessories';
var navlinkNames = ['link11', 'link21', 'link31'];
var carMoto = 'This is some  text';

//2. Variables for adds
var add1Title = 'Title1 Text';

//text Loader for Jquery
$(document).ready(() => {
    // 1.load navbar text
    $('.navbar-brand').html(navBarBrand);
    $('.nav-link').each((i, el) => {
        $(el).html(navlinkNames[i]);
    });
    $('#moto').html(carMoto);

    //2. Assigned the variables
    $('#add1Title').text(add1Title);
});

console.log('displaytext.load');