/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//document.ElementById("pad15").innerHTML = "Hello JavaScript!";

function bgColors(){
    this.colors = [ "#093145", "#0c374D", "#0d3d56",
                    "#107896", "#1287a8", "#1496bb",
                    "#3c6478", "#829356", "#c2571a",
                    "#Da621e", "#f26d21", "#9a2617",
                    "#AD2a1a", "#C02f1d"];
}

bgColors.prototype.getColor = function() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];

    
};


function MenuBuilder(classToInsertIn){
    this.menuClass = classToInsertIn;
    $(this.menuClass).html("");
}



// Add methods like this.  All Person objects will be able to invoke this
MenuBuilder.prototype.createButton = function(Label, fileid) {
        //Grab the current menu class to stick content into
        var bgC = new bgColors();
        var result = bgC.getColor();
        
        
        
        //Button for us
        var outputClass = ` <div class="link btn2 btnHolder btn btn-default pad15 sfx" id="`+fileid+`">
                            <div class="link btnLabel" id="`+fileid+`">` + Label + `                                     
                            </div></div> `;
        //Putting button inside the thing.
        $(this.menuClass).append(outputClass);
        //$("#"+fileid).css("background", result);
        return this;
    
};



$(document).ready(function() {
    $('div').live('click', function(e){  
        if (e.target.id.length > 1) {
        //We use the filename of our link as our id
        if (e.target.id === "gobacktomenu"){
            setTimeout(function(){ 
                window.location.assign("http://192.168.1.123/EVpos/Menu.php");
            }, 250);
        }
        else    {
            setTimeout(function(){ 
                window.location.assign("http://192.168.1.123/EVpos/pages/"+e.target.id+".php");
            }, 250);
        }
       
        //alert(e.target.id);
        }
    });
    
    
});


