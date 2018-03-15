module.exports = function() {
    console.log('common section hide');
    $('#accordion').empty();
    $('#left').empty();
    $('#partsViewContainerM').empty();
    $('#filterDropDownM').remove();
    $('#partsViewContainer').css('display', 'none');
    $('#partsViewContainerM').css('display', 'none');
    //$('#partsViewFP').css('display', 'none');
};