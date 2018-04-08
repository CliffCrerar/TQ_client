/**
 * long description for the file
 *
 * @summary Executed when like is clicked
 * @author Cliff Crerar
 *
 * Created at     : 2018-04-08 13:41:55 
 * Last modified  : 2018-04-08 14:54:40
 */

const sreq = require('./00_serverReq');

module.exports = (ev)=>{
    $(ev.target).addClass('active');
    /*$(ev.target).find('.badge').removeClass('badge-primary').addClass('badge-secondary');
    console.log(ev.target.id);
    console.log($(ev.target).find('.badge').html());
    var btnID = ev.target.id;
    var currLiked = $(ev.target).find('.badge').html();
    console.log(btnID.split('-')[1]);
    sreq.like(btnID);*/
};