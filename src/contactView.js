/*------------------------*/
/*      CONTACT PAGE      */
/*------------------------*/

/* BOOSTRAP 4 */
//import '../node_modules/bootstrap/dist/css/bootstrap.css';
//import 'bootstrap';
/* IMPORT CSS */
import './css/contactView.css';
import ownerPic from './image/TQ-owner.png';

if (vpw <= 414) {
    //$('.aboutMore').remove();
    $('#pageCont').append(require('./html/contactViewM.html'));
    $('#ownerPic').attr('src', ownerPic);
}else{
    $('#pageCont').append(require('./html/contactViewD.html'));
    $('#ownerPic').attr('src', ownerPic);
}

require('./js/13_contactView');