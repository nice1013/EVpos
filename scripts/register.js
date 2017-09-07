/* 
 * Register Javascript is a javascript class which manages the 
 * the functionalities of the data for the register. 
 * Register Class 
 * Button Handling
 * Barcode Handling
 */
function Register(){
    this.price = 0;     //Total cost of their order
    this.itemBarcodes = []; //List of all the barcodes
    this.itemPrices = []; // List of all the prices of each barcode
    this.CurrentDisplayNumber = "";
    this.items = [];
    
};

function itemClass(){
    this.price = 0;     //Total cost of their order
    this.amount = 0;
    this.barcode = 0;
    this.name = 0;
    
};


Register.prototype.UpdatePrice = function(name, price) {
    //List Taxable Items. 
    
    //List Non-taxable items. 
    
    //Get Taxes. 
    
    //update price on screen, and in class
    
    //update taxes on screen, and in class
    
};



//Pad Function
Register.prototype.RefreshPriceList = function() {
    //Clear The price list. Repaint the price list
    $('.listofthings').html('');
    
    this.items.forEach(function(element) {
           //The item is in this list. increase it's amomunt.
           
           var newprice = parseFloat(Math.round(element.price * 100) / 100).toFixed(2);
           
           //Clear The price list. Repaint the price list
            var row = '<div class="priceitemrow">';
            row = row + '<div class="itemsForPriceDisplay fl">' + element.amount.toString() + ' - ' +  element.name.toString() + ' </div>';
            row = row +'<div class="itemsForPriceDisplay fr">' + newprice.toString() + '</div></div>';


           
            $('.listofthings').append(row);
           
    });
    
    
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
        //Push into the checkout list
        this.items.push(item);
    }
    
    //Update the item list
    this.RefreshPriceList();
    //SCroll to bottom.
    $('.top').animate({ scrollTop: $('.top').get(0).scrollHeight}, 500);
    
};


//Pad Functions
//Converts numbers and . to a string that can be converted to a float.
Register.prototype.AddToDisplayString = function(character) {
    //Check for a periods to make sure we dont have two of them.
    
    this.CurrentDisplayNumber = this.CurrentDisplayNumber + "" + character;
    this.SetNumberPadPrice();
};


Register.prototype.AddCustomPrice = function(input_price) {
    this.price += input_price;
    this.itemBarcodes.push("Custom Price");
    this.itemPrices.push(input_price);
    
    
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



var registerClass = new Register();












//Button Handling Register
$(document).ready(function() {
    $('.regLink').live('click', function(e){   
        var command = $(e.target).text().toString();
        command = command.trim();
        var result = parseInt(command);
        if (isNaN(result)) {
            //Is not a number
            
            if (command === "."){
                
                registerClass.AddToDisplayString(command); //Adding number character to character string.
            }
            else if(command === "Clear") {
                registerClass.ClearPad();
            }
            else if(command === "Back"){
                registerClass.Back();
            }
            else 
            {
                alert("No Command Given For this Button.");
            }
        }
        else {
            //Is a number just send to diplay for it to worry about.
            registerClass.AddToDisplayString(result); //Adding number character to character string.
            
            
        }
        //alert(trext);
    });
        
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



