$(document).ready(function (){
    var slideNum = 0;
    var slideId = $('.mySlides')[slideNum].id;
    changeSlide();
    function changeSlide(){
        slideId = $('.mySlides')[slideNum].id;
        $('#'+slideId).fadeIn('slow').delay(4000).fadeOut("slow");
        slideNum++;
        if ((slideNum) == $('.mySlides').length) {slideNum = 0;}
        setTimeout(changeSlide, 5200);                        
    }
});