/**
 * long description for the file
 *
 * @summary Script the executes when user clicks on modal window send button
 * @author Cliff Crerar
 *
 * Created at     : 2018-04-10 00:31:12 
 * Last modified  : 2018-04-10 04:09:58
 */

module.exports = (ev) => {
    var sendQuoteRequest = require('./12_sendmail');
    //console.log('click send quote');
    //console.log(ev.currentTarget.attributes[2].value);
    var modalSelector = '#' + ev.currentTarget.attributes[2].value;
    var name = $(modalSelector).find('.name').val();
    //console.log(name);
    var email = $(modalSelector).find('.email').val();
    //console.log(email);
    var msg = $(modalSelector).find('.msg').val();
    //console.log(msg);
    var quoteItem = $(modalSelector).find('.card-body').html();
    //console.log(quoteItem);
    var quote = {
        name: name,
        email: email,
        msg: msg,
        item: quoteItem,
        type: 'quote'
    };
    sendQuoteRequest(quote);
};