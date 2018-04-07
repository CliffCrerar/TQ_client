/*------------------------*/
/*      CONTACT PAGE      */
/*------------------------*/

/* BOOSTRAP 4 */
//import '../node_modules/bootstrap/dist/css/bootstrap.css';
//import 'bootstrap';
/* IMPORT CSS */
import './css/contactView.css';
$('#pageCont').append(require('./html/contactViewD.html'));

import ownerPic from './image/TQ-owner.png';
$('#ownerPic').attr('src', ownerPic);

if (vpw <= 414) {
    //$('.aboutMore').remove();
}