/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function GoFullScreen(){
    var el = document.documentElement
    , rfs = // for newer Webkit and Firefox
           el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullScreen
    ;
    if(typeof rfs!=="undefined" && rfs){
      rfs.call(el);
    } else if(typeof window.ActiveXObject!=="undefined"){
      // for Internet Explorer
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript!==null) {
         wscript.SendKeys("{F11}");
      }
    }

}


$(document).ready(function() {
    GoFullScreen();
});