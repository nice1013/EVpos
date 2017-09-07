/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//Handle Barcode Scanning
var barcode = "";

//Check if the input box data is improper.
function checkValueBad(checkthis, intBool) {
    if (checkthis === "") {
        return true;
    }
    
    if (intBool) {
        if(isNaN(checkthis))
        { return true; 
        }
    }
    
    return false;
}

function submitBarcode() {
    
    var _barcode = $("#inbarcode").val();
    var _company = $("#incompany").val();
    var _inname = $("#inname").val();
    var _instock = $("#instock").val();
    var _invendor = $("#invendor").val();
    var _buyprice = $("#inbuyprice").val();
    var _sellprice = $("#insellprice").val();
    
    if (checkValueBad(_barcode, false)){
        alert("Barcode isn't entered.");
        return null;
    }
    
    if (checkValueBad(_company, false)){
        alert("Company isn't entered");
        return null;
    }
    
    if (checkValueBad(_inname, false)){
        alert("Name isn't entered");
        return null;
    }
    
    if (checkValueBad(_instock, true)){
        alert("Stock isn't entered, or isn't a number.");
        return null;
    }
    
    if (checkValueBad(_invendor, false)){
        alert("Vendor isn't entered.");
        return null;
    }
    
    if (checkValueBad(_buyprice, true)){
        alert("Buy Price isn't entered, or isn't a number");
        return null;
    }
    
    if (checkValueBad(_sellprice, true)){
        alert("Sell price isn't entered, or isn't a number");
        return null;
    }
    
    
    
    
  $.ajax({
    type: 'POST',
    url: 'http://192.168.1.100/EVpos/phpScripts/insertInventory.php',
    data: { 'barcode': _barcode,
            'company': _company,
            'name': _inname,
            'stock': _instock,
            'vendor': _invendor,
            'buyprice': _buyprice,
            'sellprice': _sellprice},
    success: function(msg) {
      var results = JSON.parse(msg);
      
      if (results.results === true) {
          window.location = "http://192.168.1.100/EVpos/pages/menu/inventory/inventory.php";
          clearForm();
          FlipToInventoryForm();
      }
      
      
    }
  });
};


function barcodeEnter(_inbarcode) {
  $.ajax({
    type: 'POST',
    url: 'http://192.168.1.100/EVpos/phpScripts/getInventory.php',
    data: {'barcode': _inbarcode},
    success: function(msg) {
      
      
      var results = JSON.parse(msg);
      if (results.results === null)
      {
          
          FlipToInventoryForm();
          $("#inbarcode").val(_inbarcode);
          
          setTimeout(function(){ 
                $("#incompany").focus();
                  }, 100);
      }
    }
  });
};





function queryList(_query) {
  $.ajax({
    type: 'POST',
    url: 'http://192.168.1.100/EVpos/phpScripts/getInventoryList.php',
    data: {'query': _query},
    success: function(msg) {
      alert("Success");
      alert(msg);
    }
  });
};
























//Functions that deal with UI
function FlipToInventoryForm() {
    $("#inventoryList").toggle();
    $("#inventoryForm").toggle();
}

function clearForm() {
    $("#inbarcode").val('');
    $("#incompany").val('');
    $("#inname").val('');
    $("#instock").val('');
    $("#invendor").val('');
    $("#inbuyprice").val('');
    $("#insellprice").val('');
}































//Juery Actions

//Set up site
$(document).ready(function() {
    $("#inventoryForm").hide();
});

$('#submitBarcode').live('click', function(e){  
    submitBarcode();
  
});

$('#cancel').live('click', function(e){  
    clearForm();
    FlipToInventoryForm();
  
});



//Handle Barcode input to textbox
$(document).keydown(function(event){
  //For each input handle it's thing differently. Here just in case we want to add some auto finish crap.
  if ($("#inbarcode").is(":focus")) {
      //handle keydown for this.
  }
  else if ($("#incompany").is(":focus")) {
      //handle keydown for this.
  }
  else if ($("#inname").is(":focus")) {
      //handle keydown for this.
  }
  else if ($("#instock").is(":focus")) {
      //handle keydown for this.
  }
  else if ($("#invendor").is(":focus")) {
      //handle keydown for this.
  }
  else if ($("#inbuyprice").is(":focus")) {
      //handle keydown for this.
  }
  else if ($("#insellprice").is(":focus")) {
      //handle keydown for this.
  }
  else if ($("#barcode").is(":focus")) {
        $('.InventoryItemRow').hide();
        
        var txt = $('#barcode').val();
        $('.InventoryItemRow').each(function(){
           if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) !== -1){
               $(this).show();
           }
        });
  }
  else {
      //otherwise it's a random keypress that should be directed to the barcode input
    $( "#barcode" ).focus();
  }
  
});

$(document).keypress(function(e) {
    if(e.which === 13) {
        //ENter Key
        
        if ($("#barcode").is(":focus")) {
            barcode = $("#barcode").val();
            $("#barcode").val('');
            
            
            barcodeEnter(barcode);

            
        }
        else if ($("#inbarcode").is(":focus")) {
        //handle keydown for this.
            $("#incompany").focus();
        }
        else if ($("#incompany").is(":focus")) {
            //handle keydown for this.
            $("#inname").focus();
        }
        else if ($("#inname").is(":focus")) {
            //handle keydown for this.
            $("#instock").focus();
        }
        else if ($("#instock").is(":focus")) {
            //handle keydown for this.
            $("#invendor").focus();
        }
        else if ($("#invendor").is(":focus")) {
            //handle keydown for this.
            $("#inbuyprice").focus();
        }
        else if ($("#inbuyprice").is(":focus")) {
            //handle keydown for this.
            $("#insellprice").focus();
        }
        else if ($("#insellprice").is(":focus")) {
            //Submit item
        }
        else {
          $( "#barcode" ).focus();
        }
       
    }
});