/**
 * long description for the file
 *
 * @summary These scripts are related to the contact view page
 * @author Cliff Crerar
 *
 * Created at     : 2018-04-09 21:48:39 
 * Last modified  : 2018-04-10 04:10:44
 */

var sendMail = require('./12_sendmail');

$('.fbType').on('click',(ev)=>{
    //console.log(ev.target);
    $('.fbType').children().each((i,el)=>{
        if($(el).hasClass('active')){
            $(el).removeClass('active');
        }
        $(ev.target).addClass('active');
    });
});

$('#fbSend').on('click',()=>{
    //console.log('send feedback click');
    var feedback = {};
    if(screen.width <= 414){
        var fbType;
        $('.fbType').children().each((i,el)=>{
            if($(el).hasClass('active')){
                fbType = $(el).html();
            }
        });
        feedback = {
            name: $('#fbName').val(),
            email: $('#fbEmail').val(),
            fbType: fbType,
            msg: $('#fbMessage').val(),
            type: 'feedback'
        };
    } else {
        feedback = {
            name: $('#fbName').val(),
            email: $('#fbEmail').val(),
            fbType: $('#fbType').val(),
            msg: $('#fbMessage').val(),
            type: 'feedback'
        };
    }
    //console.log(feedback);
    sendMail(feedback);
});