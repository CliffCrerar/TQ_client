console.log('Start parts request');
var partsData;
var URL = 'http://172.16.0.152:8000';
//var URL = 'http://172.20.10.3:8000';
$.ajax({
    url: URL,
    type: 'GET',
    success: (response) => {
        window.partsData = JSON.parse(response);
        console.log('Parts data request successful');
    },
    error: (error) => {
        window.partsData = '!!!!Parts data not loaded';
        console.log('An error has occured during parts data');
        console.log(error);
    }
});