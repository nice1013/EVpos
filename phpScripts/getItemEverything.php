<?php

/* 
 * .Will grab the inventory from selection or return nothing.
 */
session_start(); // Starting Session

if ($_SESSION['user'] == "") {
    #password failed
    echo "No User";
    header('Location: http://192.168.1.100/EVpos/index.php'); // Redirecting To Other Page
}


require_once('/var/www/html/EVpos/scripts/rb.php');

R::setup( 'mysql:host=localhost;dbname=auto', 'dankelly', 'password' );

$inventory = R::dispense( 'inventory' );

$barcode = $_POST['barcode'];


$itemsFound = R::findOne('inventory', ' barcode = ? ', [ $barcode ] );
$thing->results = $itemsFound;
$thing->barcode = $barcode;
echo json_encode($thing);

