$(document).ready(() => {
    var lpCarHeight = ($('.lpCarousel').height());
    console.log(lpCarHeight);
    $('.slickCarousel').css('height', lpCarHeight);
});