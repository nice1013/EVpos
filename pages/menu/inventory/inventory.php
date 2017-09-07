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
        
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/inventory.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/bootstrap.css">
        <link rel="stylesheet" type="text/css"  href="http://192.168.1.100/EVpos/css/priceInput.css">


        <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script>
        <script src="http://192.168.1.100/EVpos/scripts/soundEffects.js"></script>
        <script src="http://192.168.1.100/EVpos/scripts/inventory.js"></script>
        
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        
        <div class="container">
            <div class="nav">
                <div class="fl halfsize">
                   
                </div>
                <div class="fr rtl halfsize">
                    <input type="text" id="barcode" name="barcode" value="" placeholder="Enter Barcode Here"/>
                </div>
            </div>
            <div class="mainmenu" id="inventoryList">
                <div class="InventoryItemRowHeader">
                    <div id="I_company" class="fl onewidth">Company</div>
                    <div id="I_name" class="fl twowidth">Name</div>
                    <div id="I_barcode" class="fl twowidth">Barcode</div>
                    <div id="I_vender" class="fl twowidth">Vender</div>
                    
                    <div id="I_buyprice" class="fr onewidth">Buy Price</div>
                    <div id="I_sellprice" class="fr onewidth">Sell Price</div>
                    <div id="I_stock" class="fr onewidth">Stock</div>
                </div>
                <?php include_once '/var/www/html/EVpos/phpScripts/getInventoryList.php'; ?>
            </div>
            
            <?php include_once '/var/www/html/EVpos/pages/menu/inventory/inventoryForm.php'; ?>
        </div>
        
        
        
       
        
       

    </body>
</html>