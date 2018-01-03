/*  This file keeps all data about html display text  */

// 1.define display text for navbar
var navBarBrand = 'TQ Bike & 4x4 Accessories';
var navlinkNames = ['Main', 'Parts Catalogue', 'Contact'];
var carMoto = 'Top Quality offroad parts for the global market';

//2. Variables for adds
var add1Title = 'Top Boxes';
var add2Title = 'Panniers';
var add3Title = 'Brackets';
var add4Title = 'Bash plates';
var add5Title = 'Combos';
var add6Title = 'Roof racks';

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
    $('#add2Title').text(add2Title);
    $('#add3Title').text(add3Title);
    $('#add4Title').text(add4Title);
    $('#add5Title').text(add5Title);
    $('#add6Title').text(add6Title);
});

console.log('displaytext.load');