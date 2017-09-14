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
        <title>Inventory</title>
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/pages.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        
        <div class="login">
            <div class="super">
                <div class="left">
                    <p>Dan Kelly & Son's Auto Management  </p>
                </div>
                <div class="right">
                    <a href="http://192.168.1.100/DanKelly/carform.php"><img src="http://192.168.1.100/DanKelly/images/plusSign.png" width="25px" height="25px" />
                    </a>
                </div>
            </div>
            <div class='mainmenu'
               <h2>Inventory</h2>
                   <script src="http://cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.min.js"></script>
                   <img src="data:image/png;base64,iVBORw0K..." />
            </div>
            
            
        </div>
        
        
        
       
        
       

    </body>
</html>