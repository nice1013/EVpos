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
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/cashregistration.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/bootstrap.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/priceInput.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/numberpad.css">


        <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script>
        <script src="http://192.168.1.100/EVpos/scripts/soundEffects.js"></script>
        <script src="http://192.168.1.100/EVpos/scripts/register.js"></script>
        <script src="http://192.168.1.100/EVpos/scripts/cashregisterButtons.js"></script>

        <meta charset="UTF-8">
    </head>
    
        
        
        <div class='container2'>
            <div class="nav"> 
                <div class="fl halfsize">
                    
                    
                    <div class=" btn7 btnHolder btn btn-default sfx" id="gobacktomenu">
                    <div class=" btnLabel" id="gobacktomenu"> Back                         
                    </div></div> 

                    <div class=" btn7 btnHolder btn btn-default sfx" id="gobacktomenu">
                    <div class=" btnLabel" id="gobacktomenu"> Blank                         
                    </div></div> 
                    
                    <div class=" btn7 btnHolder btn btn-default sfx" id="gobacktomenu">
                    <div class=" btnLabel" id="gobacktomenu"> Blank                         
                    </div></div> 
                    
                    <div class=" btn7 btnHolder btn btn-default sfx" id="gobacktomenu">
                    <div class=" btnLabel" id="gobacktomenu"> Blank                         
                    </div></div> 
                    
                </div>
                
                
                
                
                
                <div class="fr rtl halfsize">
                    <input type="text" id="barcode" name="barcode" value="" placeholder="Enter Barcode Here"/>
                </div>
                
                
            </div>
            <div class='mainmenu'>
                <div class="fl H100 halfsize">
                    
                    
                    <!-- Row 1 -->
                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                              
                    </div></div>


                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                            
                    </div></div>
                    
                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                              
                    </div></div>


                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                            
                    </div></div>
                    
                    
                    <!-- Row 2 -->
                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                              
                    </div></div>


                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                            
                    </div></div>
                    
                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                              
                    </div></div>


                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                            
                    </div></div>
                    
                    
                    <!-- Row 3 -->
                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                              
                    </div></div>


                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                            
                    </div></div>
                    
                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                              
                    </div></div>


                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                            
                    </div></div>
                    
                    
                    <!-- Row 4 -->
                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                              
                    </div></div>


                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                            
                    </div></div>
                    
                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                              
                    </div></div>


                    <div class="link btn8 btnHolder btn btn-default sfx" id="quickprice">
                    <div class="link btnLabel" id="quickprice"> Blank                            
                    </div></div>
                
                    
                </div>
                
                <div class="fr H100 halfsize">
                <?php  include_once('numberPad.php');
                    ?>
                </div>
                
                
                
                    
                
            </div>
            
        </div>
        <div class="reciept">
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
                <div class="one">Total:</div><div class="two">0.00</div>
            </div>
        </div>
        
 
        
    </body>
</html>


