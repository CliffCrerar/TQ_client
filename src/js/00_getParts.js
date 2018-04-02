console.log("00.1_Parts request started");

const URL = "http://34.242.179.249:8010/";
//var URL = "http://172.16.0.104:8010/";
//var URL = 'http://196.32.249.85:8000';
//var URL = 'http://172.20.10.3:8000';

$.ajax({
  url: URL + "getParts",
  type: "GET",
  success: response => {
    console.log(response);
    window.partsData = response;
    console.log("00.2_Parts data request successful");
    console.log(URL);
  },
  error: (error, xhr, more) => {
    console.log(URL);
    window.partsData = "!!!!Parts data not loaded";
    console.log("An error has occured during parts data");
    console.log(error);
    console.log(xhr);
    console.log(more);
  }
});
console.log("00_getParts.loaded");
