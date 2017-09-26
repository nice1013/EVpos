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
    //THings to do with the moving of the page
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


//Register just has the face and current value of the current transactions. it holds only one item
//When the cash or credit buutton is hit, the tranasction is passed to the transaction class.
function Register(){
    //Numpad
    this.CurrentDisplayNumber = ""; //The display number for the numpad
    
    //Register 
    this.price = 0;                 //Total cost of their order -- in the receipts column inside cash register.php
    this.items = [];                //The list of items the person has scanned or punched in
    this.taxes = 0;                 //The currnent taxes owed for this owrder calculated by looping items and doing the math for untaxed and taxed items
    this.subtotal = 0;              //The amount it cost before taxes are applied
    this.creditpaid = 0;            //The amount the customer has paid in credit to the customer.
    this.cashpaid = 0;              //The aomunt the customer has pain in cash towards the transaction
    this.ebtPaid = 0;               //Total ebt paid
    this.totalPaid = 0;
    this.amountowed = 0;            //The amount still owed to the cash register from customer. calculated by price - (totalcreditpaid + totalcashpaid)
    this.refundpaid = 0;                //the amount we are refunding.
    this.taxableTotal = 0;          //The value amount of what was taxable
    //Ebt stuff
    this.etbTotal = 0;              //The amount that qualifies for ebt.
    this.etbDue = 0;
};

function itemClass(){
    this.price = 0;     //Sell Price for this item
    this.amount = 0;    //How many items are we selling.  
    this.barcode = 0;   //The barcode of this item
    this.name = "";     //This product's name.
    this.gtax = false;  //Is this item grocery taxable.
    this.ebt = false; //Is this item payable by ebt
};


Register.prototype.ClearOrder = function() {
    this.price = 0;
    this.items = [];
    this.taxes = 0;                 //The currnent taxes owed for this owrder calculated by looping items and doing the math for untaxed and taxed items
    this.subtotal = 0;              //The amount it cost before taxes are applied
    this.creditpaid = 0;       //The amount the customer has paid in credit to the customer.
    this.cashpaid = 0;         //The aomunt the customer has pain in cash towards the transaction
    this.amountdue = 0;            //The amount still owed to the cash register from customer. calculated by price - (totalcreditpaid + totalcashpaid)
    this.RefreshPriceList();

};




//Calculate the new price based on the items[] list
Register.prototype.UpdatePrice = function() {
    //Update the price list. go through each number and do some math
    //    //for each item in list Items. 
    var gtaxlist = [];
    var untaxlist = [];
    var untaxtotal = 0.00; //holds that temp untax value for all non taxed probuts
    var taxedtotal = 0.00; //hold the temp tax value for all tax products
    var ebttaxlist = [];
    var ebtuntaxlist = [];
    var ebttaxtotal = 0;
    var ebtuntaxtotal = 0;
    //Sort our items into 4 list. taxable and non taxable items. And EBT taxable and non taxable items
    this.items.forEach(function(element) {
        var tinytotal = element.price * element.amount; //The price of item times the amount of items
        
        if(element.gtax)
        {    //This is a taxable item. Keep its tinytotal in the taxable list
             if(element.ebt) { //Put this item into the ebt list.
                ebttaxlist.push(tinytotal);
             }
             else
             {
                gtaxlist.push(tinytotal);
             }
        }
        else
        {    //We are here, so put this untaxed item into it's list
             if(element.ebt) { 
                //Put this item into the ebt list.
                ebtuntaxlist.push(tinytotal);
             }
             else 
             {
                untaxlist.push(tinytotal);  
             }

        }
           
    });
    
    //Get total sum(tinytotals) for each list.    
    gtaxlist.forEach(function(price) {
        taxedtotal = taxedtotal + price;
    });
    
    untaxlist.forEach(function(price) {
        untaxtotal = untaxtotal + price;
    });
      
    ebttaxlist.forEach(function(price) {
        ebttaxtotal = ebttaxtotal + price;
    });
     
    ebtuntaxlist.forEach(function(price) {
        ebtuntaxtotal = ebtuntaxtotal + price;
    });
    
    
    //Parse this shit as two decimals
    var combineduntaxtotal = parseFloat(parseFloat(Math.round((untaxtotal + ebtuntaxtotal) * 100) / 100).toFixed(2));
    var combinedtaxedtotal = parseFloat(parseFloat(Math.round((taxedtotal + ebttaxtotal) * 100) / 100).toFixed(2));
    

    //Create our pre taxed subtotal
    this.subtotal = combineduntaxtotal + combinedtaxedtotal;
    this.ebtTotal = parseFloat(parseFloat(Math.round((ebttaxtotal + ebtuntaxtotal) * 100) / 100).toFixed(2));
    
    
    
    //Calculate the total paid for this bill
    this.totalPaid = this.creditpaid + this.cashpaid + this.ebtPaid;
    //and the EBT that is due on the bill
    this.ebtDue = this.ebtTotal - this.ebtPaid;
    
    
    
    //EBT can cancel out taxable items. figure out what our real taxable item value is so we
    //can give the right bill to the customer. One of these statements have to run.
    if (this.ebtDue === 0 || this.ebtPaid > ebttaxtotal) {
        //That means we need nothing from the ebt amounts
        this.taxableTotal = parseFloat(parseFloat(Math.round((taxedtotal) * 100) / 100).toFixed(2));
    }
    else if (this.ebtPaid <= ebttaxtotal)
    {
        //this amount paid is less than or equal to ebttaxtotal. get the remainder.
        var ebttemptaxtotal = ebttaxtotal - this.ebtPaid;
        //This means we we paid more than the ebttaxtotal and only need the ebtuntaxedamounts
        this.taxableTotal = parseFloat(parseFloat(Math.round((taxedtotal + ebttemptaxtotal) * 100) / 100).toFixed(2));
    }
    
    
    //Calcualate new taxes based on the taxable items
    this.taxes = this.quickParseFloat(this.taxableTotal * totaltaxrate);
    
    
    
    //Calcuat the new total with the original untaxtotal, the original taxed total, and the new taxes
    this.price = this.quickParseFloat(combineduntaxtotal + combinedtaxedtotal + this.taxes);
    
    //The amount due is the total - amountpaid 
    this.amountdue = this.price - this.totalPaid; 
        
    
    
    
    
    //Change the labels
    $('.chargesubtotal').html(this.subtotal.toFixed(2));    //Subtotal
    $('.chargetaxes').html(this.taxes.toFixed(2));          //Taxes
    $('.chargetotal').html(this.price.toFixed(2));          //Total
    $('.chargepaid').html(this.totalPaid.toFixed(2));       //Paid
    $('.chargedue').html(this.amountdue.toFixed(2));        //Amount due
    $('.chargeebttotal').html(this.ebtTotal.toFixed(2));    //EBT balance
    $('.chargeebtpaidtotal').html(this.ebtPaid.toFixed(2)); //EBT acceptable balace

    
    
    
    

    
};



//Refreshes the price list
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
        item.ebt        = _input.results.ebt;
        //Push into the checkout list
        this.items.push(item);
    }
    
    //Update the item list
    this.RefreshPriceList();
    
    
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
        item.ebt        = false; //All custom items are automattically false.
        //Push into the checkout list
        this.items.push(item);


        this.RefreshPriceList(); 
        this.ClearPad(); //Clear the numpad display
    }
};




//Number Pad
//Converts numbers and . to a string that can be converted to a float.
Register.prototype.AddToDisplayString = function(character) {
    //Check for a periods to make sure we dont have two of them.
    
    this.CurrentDisplayNumber = this.CurrentDisplayNumber + "" + character;
    this.SetNumberPadPrice();
};

//get number of decimal places in a string
Register.prototype.decimalPlaces = function(num) {
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
};

//Returns a formated 2 decimal float from a number string.
Register.prototype.quickParseFloat = function(num) {
    return parseFloat(parseFloat(Math.round(parseFloat(num) * 100) / 100).toFixed(2));
}

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
            else if(command === "Clear") {
                registerClass.ClearPad();
            }
            else if(command === "Back"){
                registerClass.Back();
            }
            
            else {
                
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
    url: 'http://192.168.1.123/EVpos/phpScripts/getInventory.php',
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

$(document).keypress(function(e) {
    if (($("#barcode").is(":focus")) === false) {
      $( "#barcode" ).focus();
    }
    
    if(e.which === 13) {
       
       setTimeout(function(){ 
           barcode = $("#barcode").val().trim();
            $("#barcode").val('');
            GetBarcode();
       
           
           
           $("#barcode").blur();
            }, 100);
       
    }
});



$('#CancelOrder').live('click', function(e){  
    registerClass.ClearOrder(); //Cancel the current order. OR CLEAR
    registerClass.ClearPad(); //Clear the number pad
});

$('#switchUI').live('click', function(e){  
    
    uiClass.slidePane();
});

$('#switchUI').live('click', function(e){  
    
    uiClass.slidePane();
});

$('#taxedItem').live('click', function(e){  
    
    registerClass.AddCustomPrice(true);
});

$('#untaxedItem').live('click', function(e){  
    registerClass.AddCustomPrice(false);
});


$('#deleteItem').live('click', function(e){  
    registerClass.items.pop(); //Get rid of last item
    registerClass.RefreshPriceList();
});



