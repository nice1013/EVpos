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

<div class="mainmenu" id="itemDetails">
    <div onclick='' class='itemstring'>string</div>
    <div onclick='' class='quick'>WE HERE</div>
    <div onclick='' class='delete'>Delete</div>
    <div onclick='' class='backtoimenu'>Back</div>
        
        
</div>
