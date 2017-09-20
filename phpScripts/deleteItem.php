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


$inventory->barcode      = filter_input(INPUT_POST, 'barcode');


$itemsfound = R::findOne('inventory', ' barcode = ? ', [ $inventory->barcode ] );

if (count($itemsfound) == 0) {
    //Great nothing to be done.
    $results->results = true;
    $results->message = "We didn't have anything to delete. So i guess we're okay. yay.";
    echo json_encode($results);
    
}
else 
{
    R::trash($itemsfound);
    $results->results = true;
    $results->message = "Great work men. We deleted that pesky item";
    echo json_encode($results);
}


