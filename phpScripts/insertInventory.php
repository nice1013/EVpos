<?php

/* 
 * .Will grab the inventory from selection or return nothing.
 */
session_start(); // Starting Session

if ($_SESSION['user'] == "") {
    #password failed
    echo "No User";
    header('Location: http://192.168.1.123/EVpos/index.php'); // Redirecting To Other Page
}


require_once('/var/www/html/EVpos/scripts/rb.php');


R::setup( 'mysql:host=localhost;dbname=auto', 'dankelly', 'password' );

$inventory = R::dispense( 'inventory' );


$inventory->name         = filter_input(INPUT_POST, 'name');
$inventory->company      = filter_input(INPUT_POST, 'company');
$inventory->barcode      = filter_input(INPUT_POST, 'barcode');
$inventory->buyprice     = filter_input(INPUT_POST, 'buyprice');
$inventory->sellprice    = filter_input(INPUT_POST, 'sellprice');
$inventory->stock        = filter_input(INPUT_POST, 'stock');
$inventory->vendor       = filter_input(INPUT_POST, 'vendor');
$inventory->gtax       = filter_input(INPUT_POST, 'gtax');
$inventory->ebt       = filter_input(INPUT_POST, 'ebt');



$itemsfound = R::findOne('inventory', ' barcode = ? ', [ $inventory->barcode ] );

if (count($itemsfound) == 0) {
    $inventory->id = R::store($inventory);
    $sb = true;
    $results->results = $sb;
    $results->item = $inventory;
    echo json_encode($results);
}
else 
{
    $sb = false;
    $results->results = $sb;
    echo json_encode($results);
}


