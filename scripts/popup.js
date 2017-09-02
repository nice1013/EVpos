$(document).ready(function() {
    var priceModelShowing = false; //Is quick price calculator showing
    
    $("html").live('click', function (e) {
        if (priceModelShowing) {
            if ($(e.target).closest(".popup").length === 0) {
                $(".popup").css({"display":"none"});
                priceModelShowing = false;
            }
        }
    });
    
    $('#quickprice').live('click', function(e){         
        $(".popup").css({"display":"block"});
        setTimeout(function(){ priceModelShowing = true; }, 1000);
        
    }); 
       
    
        
});

