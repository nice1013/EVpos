/* 
 * Register Javascript is a javascript class which manages the 
 * the functionalities of the data for the register. 
 * Register Class 
 * Button Handling
 * Barcode Handling
 */
phillytaxrate = .02;//
pataxrate = .06;
var totaltaxrate = pataxrate + phillytaxrate;

var leftFacing = false;


function UI(){
    //Get parts of page.
    this.qbid = '.quickbuttons';
    this.reid = '.reciept';
    this.nuid = '.numberpad';
    
    
    this.slide = 0; //we have 6 different ways. 
    
    //Undo the things we really didn't want to do, but had to to get our code.
    //Grab our data from each panel
    

    

    
    
    
}

UI.prototype.slidePane = function() {
    //Move the three panes areound. it looks funky. idc. we wont be here again pattern is
    //qbdata redata  nudata 
    //redata nudata qbdata
    //nudata qbdata redata 
    //qbdata nudata redata 
    //redata qbdata nudata
    //nudata redata qbdata
    
    
    this.qbdata = $(this.qbid).wrap('<p/>').parent().html();
    this.redata = $(this.reid).wrap('<p/>').parent().html();
    this.nudata = $(this.nuid).wrap('<p/>').parent().html();
    $(this.qbid).unwrap();
    $(this.reid).unwrap();
    $(this.nuid).unwrap();
    //Remove these things, well replace them in a different order.
    $(this.qbid).remove();
    $(this.reid).remove();
    $(this.nuid).remove();
    
    
    
    
    if (this.slide === 1) {
        $('body').append(this.qbdata);
        $('body').append(this.redata);
        $('body').append(this.nudata);
        this.slide = this.slide + 1;
    }
    else if (this.slide === 2) {
        $('body').append(this.redata);
        $('body').append(this.nudata);
        $('body').append(this.qbdata);
        this.slide = this.slide + 1;
    }   
    else if (this.slide === 3) {
        $('body').append(this.nudata);
        $('body').append(this.qbdata);
        $('body').append(this.redata);
        this.slide = this.slide + 1;
    }    
    else if (this.slide === 4) {
        $('body').append(this.qbdata);
        $('body').append(this.nudata);
        $('body').append(this.redata);
        this.slide = this.slide + 1;
    }   
    else if (this.slide === 5) {
        $('body').append(this.redata);
        $('body').append(this.qbdata);
        $('body').append(this.nudata);
        this.slide = 0;
    }
    
    else if (this.slide === 0) {
        $('body').append(this.nudata);
        $('body').append(this.redata);
        $('body').append(this.qbdata);
        this.slide = this.slide + 1;
    }   
    else { 
        alert("Nothing for some reason"); 
    }
    
};



function Register(){
    this.price = 0;     //Total cost of their order
    this.CurrentDisplayNumber = "";
    this.items = [];
    this.taxes = 0;
    
};

function itemClass(){
    this.price = 0;     //Total cost of their order
    this.amount = 0;
    this.barcode = 0;
    this.name = 0;
    this.gtax = false;
    
};



Register.prototype.CancelOrder = function() {
    this.price = 0;
    this.items = [];
    this.taxes = 0;
    this.RefreshPriceList();
};


Register.prototype.UpdatePrice = function() {
    //Update the price list. go through each number and do some math
    //    //for each item in list Items. 
    var gtaxlist = [];
    var untaxlist = [];
    var untaxtotal = 0.00;
    var taxedtotal = 0.00;
    
    
    this.items.forEach(function(element) {
           //The item is in this list. increase it's amomunt.
           if(element.gtax){
               //append to new 
               gtaxlist.push(element.price * element.amount);
               
           }
           else
           {
               untaxlist.push(element.price * element.amount);
           }
           
    });
    
    //Calc taxed total.alert('4')
    gtaxlist.forEach(function(price) {
            
            var newquicktotal = taxedtotal + price;
            taxedtotal = parseFloat(parseFloat(Math.round(newquicktotal * 100) / 100).toFixed(2));
            
    });
    
    
    this.taxes = taxedtotal * totaltaxrate;
    parseFloat(parseFloat(Math.round(this.taxes * 100) / 100).toFixed(2));
    taxedtotal = taxedtotal + (this.taxes);
    //Calc taxed total.
    untaxlist.forEach(function(price) {
           untaxtotal = untaxtotal + price;
    });
    
    
    this.price = untaxtotal + taxedtotal;
    $('.chargetotal').html(this.price.toFixed(2));
};



//Pad Function
Register.prototype.RefreshPriceList = function() {
    //Clear The price list. Repaint the price list
    $('.listofthings').html('');
    
    
    this.items.forEach(function(element) {
           //The item is in this list. increase it's amomunt.
           
           var newprice = parseFloat(Math.round(element.price * element.amount * 100) / 100).toFixed(2);
           
           //Clear The price list. Repaint the price list
            var row = '<div class="priceitemrow">';
            row = row + '<div class="itemsForPriceDisplay fl">' + element.amount.toString() + ' - ' +  element.name.toString() + ' </div>';
            row = row +'<div class="itemsForPriceDisplay fr">' + newprice.toString() + '</div>';
            row = row + ' </div>';


           
            $('.listofthings').append(row);
           
    });
    
    this.UpdatePrice(); //Update total charge price for the customer
    //SCroll to bottom.
    $('.top').animate({ scrollTop: $('.top').get(0).scrollHeight}, 500);
};





//Pad Functions
//Adds a barcode to the list. its the first of likke a four function chain.
Register.prototype.AddToList = function(_input) {
    //Check to make sure we dont have two of them.
    //alert(_input.results);
    var founditembool = false;
    
    //Check to see if we already have this item. if so, just increase the number
    this.items.forEach(function(element) {
       if (_input.results.barcode === element.barcode) {
           //The item is in this list. increase it's amomunt.
           element.amount += 1;
           founditembool = true;
       }
    });
    
    if(founditembool === false){
        //Set up the item
        var item = new itemClass();
        
        item.barcode    = _input.results.barcode;
        item.price      = _input.results.sellprice;
        item.name       = _input.results.name;
        item.amount     = 1;
        item.gtax       = _input.results.gtax;
        //Push into the checkout list
        this.items.push(item);
    }
    
    //Update the item list
    this.RefreshPriceList();
    
    
};


//Pad Functions
//Converts numbers and . to a string that can be converted to a float.
Register.prototype.AddToDisplayString = function(character) {
    //Check for a periods to make sure we dont have two of them.
    
    this.CurrentDisplayNumber = this.CurrentDisplayNumber + "" + character;
    this.SetNumberPadPrice();
};


Register.prototype.AddCustomPrice = function(_gtax) {
    
    input_price = parseFloat(parseFloat(Math.round(parseFloat(this.CurrentDisplayNumber) * 100) / 10000).toFixed(2));
    
    if(input_price > 0){
        var item = new itemClass();

        item.barcode    = "Custom_"+ $.now().toString();
        item.price      = input_price;
        item.name       = "Custom_Item";
        item.amount     = 1;
        item.gtax       = _gtax;
        //Push into the checkout list
        this.items.push(item);


        this.RefreshPriceList(); 
        this.ClearPad(); //Clear the numpad display
    }
};

//get number of decimal places in a string
Register.prototype.decimalPlaces = function(num) {
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
};


Register.prototype.Back = function() {
    //Reseting everything back to normal.
    this.CurrentDisplayNumber  = this.CurrentDisplayNumber.substring(0, this.CurrentDisplayNumber.length - 1);
    this.SetNumberPadPrice();
};

Register.prototype.ClearPad = function() {
    //Reseting everything back to normal.
    $("#pNumPadDisplay").html("0.00");
    this.CurrentDisplayNumber = "";
};

Register.prototype.SetNumberPadPrice = function() {
    //We are checking to see if we have 2 decimal places if so. We want to keep 2. 
    //If less, we want to keep less.
    var todisplay = null;
    
    todisplay = parseFloat(Math.round(this.CurrentDisplayNumber * 100) / 10000).toFixed(2);
    
    $("#pNumPadDisplay").html(todisplay);
};


Register.prototype.changeAmount = function() {
    try {
        //Get the decimal number from the screen. turn it into a positive int
        if (parseFloat(this.CurrentDisplayNumber) > 0) {
            this.items[this.items.length - 1].amount = parseFloat(this.CurrentDisplayNumber);
            //Clear the num pad.
            this.ClearPad();
            //Update the total price
            this.RefreshPriceList();
        }
    }
    catch(err) {
        alert(err.message);
    }
    
};








































var registerClass = "";
var uiClass = "";

//Button Handling Register
$(document).ready(function() {

    registerClass = new Register();
    uiClass = new UI();

});







//Button Handling Register
    $('.regLink').live('click', function(e){  
        var command = $(e.target).text().toString();
        command = command.trim();
        var result = parseInt(command);
        
        
        if (isNaN(result)) {
            //Is not a number
            
            if(command === "X") {
                registerClass.changeAmount();
            }
            else if(e.target.id === "regEnter") {
                registerClass.AddCustomPrice();
            }
            else if(command === "Clear") {
                registerClass.ClearPad();
            }
            else if(command === "Back"){
                registerClass.Back();
            }
            
            else {
                
                alert("No Command Given For this Button.");
            }
        }
        else {
            //Is a number just send to diplay for it to worry about.
            
            registerClass.AddToDisplayString(result); //Adding number character to character string.
            
            
        }
        //alert(trext);
    });
        

function GetBarcode() {
  // tmp value: [{"id":21,"children":[{"id":196},{"id":195},{"id":49},{"id":194}]},{"id":29,"children":[{"id":184},{"id":152}]},...]
  $.ajax({
    type: 'POST',
    url: 'http://192.168.1.100/EVpos/phpScripts/getInventory.php',
    data: {'barcode': barcode},
    success: function(msg) {
      var msg2 = JSON.parse(msg);
      if (msg2.results === null){
          alert("Barcode not found!");
      }
      else
      {
          registerClass.AddToList(msg2);
          
      }
    }
  });
};

//Handle Barcode Scanning
var barcode = "";
//Handle Barcode input to textbox
$(document).keydown(function(event){
  $( "#barcode" ).focus();
  
  
});

$(document).keypress(function(e) {
    if(e.which === 13) {
       barcode = $("#barcode").val();
       
       $("#barcode").val('');
       GetBarcode();
       
       setTimeout(function(){ 
           $("#barcode").blur();
            }, 100);
       
    }
});



$('#CancelOrder').live('click', function(e){  
    registerClass.CancelOrder();
});

$('#switchUI').live('click', function(e){  
    
    uiClass.slidePane();
});

$('#switchUI').live('click', function(e){  
    
    uiClass.slidePane();
});
