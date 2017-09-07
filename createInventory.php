<?php
require_once('rb.php');

R::setup( 'mysql:host=localhost;dbname=auto', 'dankelly', 'password' );

$inventory = R::dispense( 'inventory' );


/* Inventory system works like this.
 * 
 * 
 * 
 */


        
$item->id = $_name;
$item->name = '';
$item->barcode = '';
$item->buyprice = '';
$item->sellprice = '';
$item->stock = '';
$item->vendor = '';
        
        




$username = "DanKelly6";
$password = "12345678";
$password = password_hash($password, PASSWORD_DEFAULT);
$loginsFound = R::findOne('login', ' username = ? ', [ $username ] );


if (count($loginsFound) == 0) {
    #User Does NOT exist.
    $login->username = $username;
    $login->password = $password;
    $id = R::store( $login );
    echo "Added A Record <br>";
    echo $username . " <br>";
    echo $password;
}
else
{
    echo "We did not add a record. \n";
}
?>