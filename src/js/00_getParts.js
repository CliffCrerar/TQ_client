var partsData;
console.log('00.1_Parts request started');

var URL = 'http://34.242.179.249:8010';
//var URL = 'http://172.16.0.104:8000';
//var URL = 'http://172.16.0.152:8000';
//var URL = 'http://172.20.10.3:8000';

$.ajax({
    url: URL,
    type: 'GET',
    success: (response) => {
        window.partsData = JSON.parse(response);
        console.log('00.2_Parts data request successful');
        for (var key in window.partsData) {
            //console.log(window.partsData[key]);
            //console.log('SP_Z_1', window.partsData[key].salePriceZAR);
            //console.log('SP_U_1', window.partsData[key].salePriceUSD);
            var spz1 = Math.ceil(window.partsData[key].salePriceZAR / 10) * 10;
            var spu1 = Math.ceil(window.partsData[key].salePriceUSD / 10) * 10;
            //console.log('SP_Z_2', spz1);
            //console.log('SP_U_2', spu1);
            var spz2 = Number(spz1 - 1).toLocaleString('en-za');
            var spu2 = Number(spu1 - 1).toLocaleString('en-US');
            //console.log('SP_Z_3', 'R ' + spz2);
            //console.log('SP_U_3', '$ ' + spu2);
            window.partsData[key].salePriceZAR = 'R ' + spz2;
            window.partsData[key].salePriceUSD = '$ ' + spu2;

        }
    },
    error: (error) => {
        window.partsData = '!!!!Parts data not loaded';
        console.log('An error has occured during parts data');
        console.log(error);
    }
});
console.log('00_getParts.loaded');