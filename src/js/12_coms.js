/**
 * long description for the file
 *
 * @summary This file handles the communications sent from the client
 * @author Cliff Crerar
 *
 * Created at     : 2018-04-08 18:11:45 
 * Last modified  : 2018-04-09 18:55:19
 */

// Declare sending IP
// const URL = "http://34.242.179.249:8020/";
//var URL = "http://172.16.0.104:8020/";
var URL = "http://192.168.1.184:8020/";
//var URL = "http://192.168.1.128:8020/";

// declare mail validation patternn
var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const sendMail = (data) => {
    $.ajax({
        url: URL,
        origin: '*',
        metod: 'POST',
        contentType: 'text/json',
        dataType: 'text/json',
        data: JSON.stringify(data),
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

module.exports = (data) => {
    console.log(data);

    var validEmail = (data.email).match(pattern);
    //console.log('validmail ',validEmail);

    if (data.name == '' && (validEmail == null || data.email == '')) {
        $("#email").css('border-color', 'red');
        $("#name").css('border-color', 'red');
        alert('MESSAGE NOT SENT \n Please enter your email address and name.');
    } else if (validEmail == null || data.email == '') {
        $("#email").css('border-color', 'red');
        alert('MESSAGE NOT SENT \n Please enter a valid email address.');
    } else if (data.name == '') {
        $("#name").css('border-color', 'red');
        alert('MESSAGE NOT SENT \n Please enter your name.');
    } else {
        console.log(data);
        sendMail(data);
        console.log('Message can be sent');
    }
};