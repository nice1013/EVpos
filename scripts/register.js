/* 
 * Register Javascript is a javascript class which manages the 
 * the functionalities of the data for the register. 
 * 
 */
function Register(){
    this.price = 0;
    this.itemBarcodes = [];
    this.itemPrices = [];
};

Register.prototype.AddCustomPrice = function(input_price) {
    this.price += input_price;
    
    
};

var barcode = "";
//Handle Barcode input to textbox
$(document).keydown(function(event){
  $( "#barcode" ).focus();
  
  
});

$(document).keypress(function(e) {
    if(e.which === 13) {
       barcode = $("#barcode").val();
       
       $("#barcode").val('');
       
       
       setTimeout(function(){ 
           $("#barcode").blur();
            }, 100);
       
    }
});
