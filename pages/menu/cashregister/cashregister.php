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
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/demo.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/bootstrap.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/model.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/priceInput.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/numberpad.css">


        <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script>
        <script src="http://192.168.1.100/EVpos/scripts/soundEffects.js"></script>
        <script src="http://192.168.1.100/EVpos/scripts/register.js"></script>
        <script src="http://192.168.1.100/EVpos/scripts/popup.js"></script>
        <meta charset="UTF-8">
    </head>
    
        
        
        <div class='container2'>
            <div class="nav"> 
                <div class="fl">
                <a> back </a> 
                </div>
                <div class="fr rtl">
                <input type="text" id="barcode" name="barcode" value=""/>
                </div>
            </div>
            <div class='mainmenu'>
                <div class="fl">
                <div class="link btn4 btnHolder btn btn-default pad15 sfx" id="quickprice">
                <div class="link btnLabel" id="quickprice"> Custom Price                              
                </div></div>
                    
                </div>
                
                <div class="fr">
                <?php  include_once('numberPad.php');
                    ?>
                </div>
                
                
                
                    
                
            </div>
            
        </div>
        <div class="reciept">
            <div class="top">
                <div class="one">Item</div><div class="two">Price</div>
                <hr id="hr">
            </div>
            <div class="total">
                <hr id="hr">
                <div class="one">Total:</div><div class="two">0.00</div>
            </div>
        </div>
        
 
        
    </body>
</html>


