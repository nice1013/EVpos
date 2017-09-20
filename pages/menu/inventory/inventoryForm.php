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

<div class="mainmenu" id="inventoryForm">
        <input type="text" id="inbarcode" name="barcode" value="" placeholder="Enter Barcode Here"/>
        <input type="text" id="incompany" name="company" value="" placeholder="Company Name"/>
        <input type="text" id="inname" name="name" value="" placeholder="Product Name"/>
        <input type="text" id="instock" name="stock" value="" placeholder="stock"/>
        <input type="text" id="invendor" name="vendor" value="" placeholder="vendor"/>
        <input type="text" id="inbuyprice" name="buyprice" value="" placeholder="Buy Price"/>
        <input type="text" id="insellprice" name="sellprice" value="" placeholder="Sell Price"/>
        
        <div class='checkbox'>
         <p>
            <a href="#" class="checkbox gtaxbutton btn btn-info btn-lg ">
                <span class="gtaxbuttonsign glyphicon glyphicon-ok"></span> 
                Grocery Taxable? 
                <span class="gtaxbuttonsign glyphicon glyphicon-ok"></span> 
            </a>
         </p> 
        </div>
        
        
       <div class="widthinventory ">
        <div class=" btn7 btnHolder btn btn-default sfx fr" id="submitBarcode">
        <div class=" btnLabel" > Submit Item                         
        </div></div> 
        <div class=" btn9 btnHolder btn btn-default sfx fl" id="cancel">
        <div class=" btnLabel" > Cancel                     
        </div></div> 
       </div>
        
        
</div>
