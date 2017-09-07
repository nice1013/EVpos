
$(document).ready(function() {
    $('#gobacktomenu').live('click', function(e){     
            setTimeout(function(){ 
                window.location.assign("http://192.168.1.100/EVpos/Menu.php");
            }, 250);
    });
    
    
});