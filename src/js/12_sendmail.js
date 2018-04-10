/**
 * long description for the file
 *
 * @summary This file handles the communications sent from the client
 * @author Cliff Crerar
 *
 * Created at     : 2018-04-08 18:11:45 
 * Last modified  : 2018-04-10 01:23:45
 */

// Declare sending IP
const URL = "http://34.242.179.249:8020/";
// var URL = 'http://172.16.0.104:8020/';
// var URL = "http://192.168.1.184:8020/";
// var URL = "http://192.168.1.128:8020/";

const showAlert = require('./14_alerts'); // get alert controls

// declare mail validation patternn
var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const sendMail = data => {
  $.ajax({
    url: URL,
    method: 'POST',
    origin: '*',
    contentType: 'text/plain',
    //headers: ({'Content-Type:','Access-Control-Allow-Origin':'*'}),
    data: JSON.stringify(data),
    dataType: 'text',
    timout: 10000,
    success: (response, status) => {
      console.log(response);
      console.log(status);
    },
    error: (err, xhr, third) => {
      console.log(err);
      console.log(xhr);
      console.log(third);
    }
  });
};

module.exports = data => {
  console.log(data);

  var validEmail = data.email.match(pattern);
  //console.log('validmail ',validEmail);

  if (data.name == '' && (validEmail == null || data.email == '')) {
    $('#email').css('border-color', 'red');
    $('#name').css('border-color', 'red');
    // alert('MESSAGE NOT SENT \n Please enter your email address and name.');
    showAlert('#AlertEmailName');
  } else if (validEmail == null || data.email == '') {
    $('#email').css('border-color', 'red');
    //alert('MESSAGE NOT SENT \n Please enter a valid email address.');
    showAlert('#AlertEmail');
  } else if (data.name == '') {
    $('#name').css('border-color', 'red');
    //alert('MESSAGE NOT SENT \n Please enter your name.');
    showAlert('#AlertName');
  } else {
    //alert('Message sent');
    //console.log(data);
    sendMail(data);
    showAlert('#AlertSent');
    if(data.type == 'quote'){
      $('.modal').modal('hide');
      $('.modal-backdrop').hide();
    } else {
      $('.fbControl').val('');
      if(screen.width <= 414) {
        $('.fbType').children().each((i,el)=>{
          //console.log('index',i);
          //console.log('Element',el);
          if(i==0){
            $(el).addClass('active');
          } else {
            $(el).removeClass('active');
          }
        });
      } else {
        $('#fbType').val('Compliment');
      }
    }
    //console.log('Message can be sent');
  }
};
