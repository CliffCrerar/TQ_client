$(document).ready(() => {
    console.log('nav.loaded')
    $('#navTop').on('click', (ev) => {
        //console.log(ev);
        //console.log($(this));
        deSelect(ev.currentTarget);
    });

    let deSelect = (container) => {
        console.log(container);
        console.log($(container).children());


    };



});