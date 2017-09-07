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






function NewList($id, $_company, $_name, $_barcode, $_vendor, $_buyprice, $_sellprice, $_stock) {
    
    $newlist  = '<div class="InventoryItemRow" id="itemrow'.$id.'">';
    $newlist .= '<div id="I_company" class="fl onewidth">' . $_company . '</div>';
    $newlist .= '<div id="I_name" class="fl twowidth">' . $_name . '</div>';
    $newlist .= '<div id="I_barcode" class="fl twowidth">' . $_barcode . '</div>';
    $newlist .= '<div id="I_vender" class="fl twowidth">' . $_vendor . '</div>';
    $newlist .= '<div id="I_buyprice" class="fr onewidth">' . $_buyprice . '</div>';
    $newlist .= '<div id="I_sellprice" class="fr onewidth">' . $_sellprice . '</div>';
    $newlist .= '<div id="I_stock" class="fr onewidth">' . $_stock . '</div>';
    $newlist .= '</div>';
    
    echo $newlist;
}




$startpoint = $_POST['startpoint'];
if ($startpoint == null) {
    $startpoint = 0;
}

//Find out if we are searching for a like item or just gett ing any
$query = $_POST['query'];


if ($query == null | $query == "") {
    $items = R::findAll(    'inventory', 
                            ' id >= ? ', 
                            array( $startpoint )
                        );
    $id = 0;
    foreach ($items as &$item){
        NewList($id, $item['company'], $item['name'], $item['barcode'], $item['vendor'], $item['buyprice'], $item['sellprice'], $item['stock']);
        $id += 1;
    }
    /*
    while($id < 1000) {
        foreach ($items as &$item){
        NewList($id, $item['company'], $item['name'], $item['barcode'], $item['vendor'], $item['buyprice'], $item['sellprice'], $item['stock']);
        $id += 1;
        }
    }
    
     */

}
else 
{
    echo "Query was not";
    //Get list for each query. Fuck it. We dont feel like making one big 
    $items = R::getAll('SELECT * FROM inventory WHERE company LIKE :query OR name LIKE :query OR barcode LIKE :query OR vendor LIKE :query',
      array(':query' => '%'.$query.'%' )
    );
    
    
    
    $id = 0;
    foreach ($items as &$item){
        NewList($id, $item['company'], $item['name'], $item['barcode'], $item['vendor'], $item['buyprice'], $item['sellprice'], $item['stock']);
        $id += 1;
    }
    
}







