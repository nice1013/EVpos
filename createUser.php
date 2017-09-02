<?php
require_once('rb.php');

R::setup( 'mysql:host=192.168.1.100;dbname=auto', 'dankelly', 'password' );


$login = R::dispense( 'login' );

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