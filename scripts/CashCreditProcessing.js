/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Transactions() {
    this.Transactions = [];
}


function Transaction(){
    this.SampleVar = "";
}

var Transacs = new Transaction();

Transaction.prototype.transactionItem = function(_inputcash) {
    this.price = 0;
    this.taxes = 0;
    this.subtotal = 0;
    this.cashpaid = 0;
    this.creditpaid = 0;
    this.creidprovider = "square";
    this.items = [];
};

Transaction.prototype.getEasyChangeString = function(_inputchange) {
    var currentchange = registerClass.quickParseFloat(_inputchange);
    var cents = registerClass.quickParseFloat(currentchange % 1);
    
    var cents = Math.floor(cents * 100);
    
    if (cents === 0) { return "Q:0  D:0  N:0  P:0  "; }
    
    var quarters = Math.floor(cents / 25);
    var leftover = cents % 25;
    if (leftover === 0) { return "Q:" + quarters + "  D:0  N:0  P:0  "; }
    
    var dimes = Math.floor(leftover / 10);
    var leftover = leftover % 10;
    if (leftover === 0) { return "Q:" + quarters + "  D:"+ dimes +"  N:0  P:0  "; }
    
    var nickles = Math.floor(leftover / 5);
    var leftover = leftover % 5;
    if (leftover === 0) { return "Q:" + quarters + "  D:"+ dimes +"  N:"+ nickles + "  P:0  "; }
    
    
    return "Q:" + quarters + "  D:"+ dimes +"  N:"+ nickles + "  P:"+leftover + "  ";
    
    
};

Transaction.prototype.MakeTransaction = function() {
    
    
    
    //Create a new tranasactions class.
    var newTrans = new this.transactionItem();
  
    
    newTrans.price = registerClass.price;
    newTrans.taxes = registerClass.taxes;
    newTrans.cashpaid = registerClass.cashpaid;
    newTrans.creditpaid = registerClass.creditpaid;
    newTrans.items = registerClass.items;
    newTrans.subtotal = registerClass.subtotal;
    
    //Clear the current order. 
    registerClass.ClearOrder();
    registerClass.ClearPad();
    
    
    
    return newTrans;
}





function startSquareTransaction(number) { 
    var dataParameter = 
    {
        "amount_money": 
            {
                "amount" : "100",
                "currency_code" : "USD"
            },
        "callback_url" : "https://192.168.1.123/EVpos/phpScripts/catchSquareCallback.php", // Replace this value with your application's callback URL
        "client_id" : "sq0idp-LLGYs3-E49buaC8Hwu7lmw", // Replace this value with your application's ID
        "version": "1.3",
        "notes": "notes for the transaction",
        "options" : {
                    "supported_tender_types" : ["CREDIT_CARD","OTHER","SQUARE_GIFT_CARD"]
                    }
    };
    
  
    var url = "square-commerce-v1://payment/create?data=" + encodeURIComponent(JSON.stringify(dataParameter));
    window.location.assign(url);
}













function sendToPrinter(transaction) {
    
    var encoded = JSON.stringify(transaction);
    alert(encoded);
    $.ajax({
    type: 'POST',
    url: 'http://192.168.1.123/EVpos/phpScripts/printer.php',
    data: {'transaction': encoded},
    success: function(msg) {
      alert(msg);
    }
  });
};


function startCashTransaction(number) {
    if (registerClass.price === 0 || number === 0) {
        alert("Empty Transaction Prevention Act. Please Donate Money To Till.")
        return null;
    }
    
    //Add the new money into this the paid money.
    registerClass.cashpaid += number;
    registerClass.amountdue = parseFloat(registerClass.price) -  parseFloat(registerClass.cashpaid) +  parseFloat(registerClass.creditpaid);
    var changedue = parseFloat(registerClass.cashpaid) +  parseFloat(registerClass.creditpaid) - parseFloat(registerClass.price) ;
    
    //If the owe us nothing. Figure out
    if (changedue >= 0) {
        //Take input price
        var newTransaction = Transacs.MakeTransaction();
        //Get the change to give out. Cash + credit in, minus price needed.
        var quickchangestring = Transacs.getEasyChangeString(changedue); // spits out what q d n p youll need.
        changedue = registerClass.quickParseFloat(changedue);
        $("#infotextbox").html("<p>Change:  "+changedue+ " <br /> " +quickchangestring + "</p>");
        $(".infobox").css("background", "#ffffff");
    }
    else 
    {
        //Update the infobox
        $("#infotextbox").html("<p> They still owe us money! </p>");
        $(".infobox").css("background", "#ffaaaa");
        
        $('.chargepaid').html(registerClass.cashpaid + registerClass.creditpaid);
        $('.chargedue').html(registerClass.amountdue);
        registerClass.ClearPad();
    }
    
    
    
    //sendToPrinter(newTransaction);
}









function startCreditTransaction(number) {
   $("#infotextbox").html("<p>Clicked 2</p>");
   if (registerClass.price === 0 || number === 0) {
        alert("Empty Transaction Prevention Act. Please Donate Money To Till.")
        return null;
    }
    
    //If it's enough for the transaction go true. else it's less and they owe us money
    if (number >= registerClass.amountdue) {
        registerClass.creditpaid += registerClass.amountdue;
        alert(registerClass.creditpaid);
        startSquareTransaction(registerClass.amountdue);
        
        var newTransaction = Transacs.MakeTransaction();
        
    }
    else 
    {
        startSquareTransaction(registerClass.amountdue);
        registerClass.creditpaid += number;
        registerClass.amountdue = parseFloat(registerClass.price) -  parseFloat(registerClass.cashpaid) +  parseFloat(registerClass.creditpaid);
    
        //Update the infobox
        $("#infotextbox").html("<p> They still owe us money! </p>");
        $(".infobox").css("background", "#ffaaaa");
        
        $('.chargepaid').html(registerClass.cashpaid + registerClass.creditpaid);
        $('.chargedue').html(registerClass.amountdue);
        registerClass.ClearPad();
        
    }
    
    
   
     
}















//Cash Functions 
$('#navCreditButton').live( "click", function(e){  
    //If this is the second time we hit this thing
    $("#infotextbox").html("<p>Clicked </p>");
    
    var number = registerClass.quickParseFloat($("#pNumPadDisplay").html());
    startCreditTransaction(number);
});

$('#navCashButton').live( "click", function(e){  
    //Start a cash tranasction.
    //Grab the current price from the numdisplay. if number is less than our wnated price it's probably fake.
    
    var number = registerClass.quickParseFloat($("#pNumPadDisplay").html());
    startCashTransaction(number);
    
});


$('#nav5button').live( "click", function(e){  
    //Start a cash tranasction.
    startCashTransaction(5);
});

$('#nav10button').live( "click", function(e){  
    //Start a cash tranasction.
    startCashTransaction(10);
});

$('#nav20button').live( "click", function(e){  
    //If this is the second time we hit this thing
   startCashTransaction(20);
});