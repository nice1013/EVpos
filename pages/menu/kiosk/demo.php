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
    header('Location: http://192.168.1.123/EVpos/index.php'); // Redirecting To Other Page
}
?>


<html>
    <head>
        <title>EVpos</title>
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.123/EVpos/css/demo.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.123/EVpos/css/bootstrap.css">
        <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script>
        <script src="http://192.168.1.123/EVpos/scripts/links.js"></script>
        <script src="http://192.168.1.123/EVpos/scripts/kiosk.js"></script>
        <script type='text/javascript' src='http://192.168.1.123/EVpos/scripts/goFullScreen.js'></script>
        <script>

            $(document).ready(function() {
                var MB = new MenuBuilder(".mainmenu");
                MB.createButton("Hot", "");
                MB.createButton("Cold", "");
                MB.createButton("Demo", "");


            });
        </script>
        
        <meta charset="UTF-8">
    </head>
    <body>
        <div class='container2'>
            <div class='mainmenu'>
                <!-- Links for each menu -->
                <p>Nothing Changed</p>
                
                    
                
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


