$(document).ready(function() {

    //Load badge sources into images from badge object
    var badge = require('./badges.js');
    $.each(badge, (name, link) => {
        $('.makes>[alt="' + name + '"]').attr('src', link);
    });

    //adjust height for navbottom
    var navBottomHeight = $('#navBottom').height();
    if (window.vpw <= 414) {
        //$('.makes').addClass('d-flex').addClass('justify-content-center');
        $('.navBadge').height(navBottomHeight - 5);
    } else {
        $('.navBadge').height(navBottomHeight);
    }
});
console.log('04_docReady.load');