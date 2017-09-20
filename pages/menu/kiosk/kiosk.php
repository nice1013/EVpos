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
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.123/EVpos/css/menu.css">
        <link rel="stylesheet" type="text/css" href="http://192.168.1.123/EVpos/css/bootstrap.css">
        <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script>
        <script src="http://192.168.1.123/EVpos/scripts/soundEffects.js"></script>
        
        <script src="http://192.168.1.123/EVpos/scripts/links.js"></script>

        <script>

            $(document).ready(function() {
                var MB = new MenuBuilder(".mainmenu");
                MB.createButton("Menu Builder", "menu/kiosk/menuBuilder");
                MB.createButton("Add Item", "menu/kiosk/additem");
                MB.createButton("Edit Item", "menu/kiosk/edititem");

                MB.createButton("See Demo", "menu/kiosk/demo");
                MB.createButton("Go Live", "menu/kiosk/live");


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
            <div class="footer">
            <div class="link btn3 btnHolder btn btn-default sfx" id="gobacktomenu">
            <div class="link" id="gobacktomenu"> Back                              
            </div></div></div>
        </div>
        
       

        
    </body>
</html>



