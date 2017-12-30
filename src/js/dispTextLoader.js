/*  This file keeps all data about html display text  */

// 1.define display text for navbar
var navBarBrand = 'TQ Bike & 4x4 Accessories';
var navlinkNames = ['link11', 'link21', 'link31', 'link41']

//text Loader for Jquery
$(document).ready(() => {
    // 1.load navbar text
    $('.navbar-brand').html(navBarBrand);
    $('.nav-link').each((i, el) => {
        $(el).html(navlinkNames[i]);
    });
});

console.log('displaytext.load');