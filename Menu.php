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
        <title>Main Menu</title>
        <link rel="stylesheet" href="css/menu.css">
        <link rel="stylesheet" href="bootstrap-3.3.7/css/bootstrap.css">
        <script type='text/javascript' src='/EVpos/scripts/jquery-1.6.4.min.js'></script>
        
        <script src="/EVpos/scripts/links.js"></script>
        <script src="/EVpos/scripts/soundEffects.js"></script>


        <script>

            $(document).ready(function() {
                var MB = new MenuBuilder(".mainmenu");
                MB.createButton("Cash Register", "menu/cashregister/cashregister");
                MB.createButton("Inventory", "menu/inventory/inventory");
                MB.createButton("Accounting", "menu/accounting/accounting");
                MB.createButton("Kiosk", "menu/kiosk/kiosk");

            });
        </script>
        <meta charset="UTF-8">
    </head>
    <body>
        <div class='container'>
            <div class='mainmenu'>
                <!-- Links for each menu -->
                <p>Nothing Changed</p>
                
                    
                
            </div>
            
        </div>
        
        
        
    </body>
</html>




