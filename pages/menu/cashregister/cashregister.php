<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php
session_start(); // Starting Session

if ($_SESSION['user'] == "") {
    #password failed
    echo "No User";
    header('Location: http://192.168.1.100/EVpos/index.php'); // Redirecting To Other Page
}
?>

<html>
    <head>
        <title>EVpos</title>
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/bootstrap-3.3.7/css/bootstrap.css">
        <script src="http://192.168.1.100/EVpos/bootstrap-3.3.7/js/bootstrap.min.js"></script>
        
        
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/cashregistration.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/priceInput.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/numberpad.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/foundation.css">
        
        <script type='text/javascript' src='/EVpos/scripts/jquery-1.6.4.min.js'></script>
        <script src="http://192.168.1.100/EVpos/scripts/soundEffects.js"></script>
        <script src="http://192.168.1.100/EVpos/scripts/register.js"></script>
        <script src="http://192.168.1.100/EVpos/scripts/cashregisterButtons.js"></script>

        <meta charset="UTF-8">
    </head>
    
    <body>   
        <div class="nav"> 
            <div class="fl halfsize H100">


                <div class=" btn7 btn btn-default sfx" id="gobacktomenu">
                <div class=" btnLabel" id="gobacktomenu"> Back                         
                </div></div> 

                <div class=" btn7 btn btn-default sfx" id="switchUI">
                <div class=" btnLabel" id="switchUI"> <span class='glyphicon glyphicon-resize-horizontal'></span>                          
                </div></div> 

                <div class=" btn7 btn btn-default sfx" id="gobacktomenu">
                <div class=" btnLabel" id="gobacktomenu"> Blank                         
                </div></div> 

                <div class=" btn7 btn btn-default sfx" id="gobacktomenu">
                <div class=" btnLabel" id="gobacktomenu"> Blank                         
                </div></div> 

            </div>
                
                
                
                
                
            <div class="fr rtl halfsize H100">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                <a href="intent:#Intent;action=com.squareup.pos.action.CHARGE;package=com.squareup;S.com.squareup.pos.WEB_CALLBACK_URI=http://192.168.1.100/EVpos/pages/menu/cashregister/cashregister.php;S.com.squareup.pos.CLIENT_ID=sq0idp-0ZX4RXkORg0M1HKHUjS-yg;S.com.squareup.pos.API_VERSION=v2.0;i.com.squareup.pos.TOTAL_AMOUNT=100;S.com.squareup.pos.CURRENCY_CODE=USD;S.com.squareup.pos.TENDER_TYPES=com.squareup.pos.TENDER_CARD,com.squareup.pos.TENDER_CARD_ON_FILE,com.squareup.pos.TENDER_CASH,com.squareup.pos.TENDER_OTHER;end">Send me $</a>
                <input type="text" id="barcode" name="barcode" value="" placeholder="Enter Barcode Here"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            </div>
                
                
        </div>
        
        <div class="quickbuttons fl">
                    
            <?php  include_once('quickbuttons.php');
            ?>
              
        </div>
                
        <div class="numberpad fl">
            <?php  include_once('numberPad.php');
                ?>
        </div>
        
        
       
        <div class="reciept fl">
            <div class="top">
                <div class="littlenav">
                    <div class="one">Item</div><div class="two">Price</div>
                    <hr id="hr">
                </div>
               
                <div class="listofthings">
                    <div class="priceitemrow">
                    <div class="itemsForPriceDisplay fl">Testing</div>
                    <div class="itemsForPriceDisplay fr">1.99</div>
                    </div>
                </div>
            </div>
            
            <div class="total">
                <hr id="hr">
                
                <div class="fl"> Taxes:</div><div class="fr">0.00</div>
                <div class="one">Total:</div><div class="two chargetotal">0.00</div>
            </div>
        </div>
        
 
        
    </body>
</html>


