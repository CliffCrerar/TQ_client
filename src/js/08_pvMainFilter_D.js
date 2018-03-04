  /*--------------------------------------*/
  /*CREATES PARTS VIEW FILTERS FOR DESKTOP*/
  /*--------------------------------------*/

  // FTYPE argument should determine what buttons myst be returned 'cat' or 'make'
  module.exports = function(event, fType) {
      $('#left').append(require('../html/partFilControls_D.html'));
      $('.defFilter').html('<div class="p2">Apply Filter</div><div class="filterIcon ml-auto p-2 fa fa-filter"></div>');
      const fp = require('./00_filteringPartsData');
      const badges = require('../js/05_badges');
      const disc = event.currentTarget.id; // declare the discriminator for filtering buttons to be created
      const type = fType;
      let parts;
      let btnCapLeg;
      //console.log(fType);
      if (type == 'cat') {
          //console.log('Buttons must be cat');
          parts = fp.byMake(event);
          btnCapLeg = require('../json/categories.json');
          $('#selectedMake').attr('src', badges[disc]);
      } else if (type == 'make') {
          //console.log('buttons must be make');
          parts = fp.byCat(event);
          btnCapLeg = require('../json/makes.json');
          $('#selectedMake').remove();
          $('#showMake').append('<p class="selectionHeading">' + event.currentTarget.text + '</p>');
      }

      let filterList = [];
      let evalElement = '';
      for (var key in parts) {
          //console.log(parts[key][type]);
          evalElement = parts[key][type];
          if (!filterList.includes(evalElement)) {
              filterList.push(evalElement);
          }
      }
      //console.log(filterList);
      let arrLen = filterList.length;
      let btnCaption = '';
      for (var i = 0; i < arrLen; i++) {
          btnCaption = filterList[i];
          for (var key2 in btnCapLeg) {
              if (btnCaption == key2) {
                  btnCaption = btnCapLeg[key2];
              }
          }
          $('#btnCont').append('<button id = "' + filterList[i] + '" type="button" class="btn btn-block btn-outline-success text-left">' + btnCaption + '</button>');
      }

      return $('.defFilter').on('click', () => {
          //console.log('click');
          //console.log($('#filterOptions').hasClass('disp'));
          if ($('#filterOptions').hasClass('show')) {
              $('#filterOptions').slideUp('2000').removeClass('show');
              $('#openFilt').removeClass('active');
              $('#accordion').children().each((i, el) => {
                  $(el).fadeIn('slow');
              });
              $('#btnCont').children().each(function(i, el) {
                  $(el).removeClass('active');
              });
              $('#openFilt>.p2').html('Apply Filter');

          } else {
              $('#filterOptions').slideDown('2000').addClass('show');
              $('#openFilt').addClass('active');
              $('#openFilt>.p2').html('Clear Filter');
          }
      });
  };

  /* FILTER EVENTS */