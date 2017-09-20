<?php
require 'escpos-php-development/autoload.php';

use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\Printer;
$connector = new NetworkPrintConnector("192.168.1.100", 9100);
$printer = new Printer($connector);




/*
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;
$connector = new FilePrintConnector("php://stdout");
$printer = new Printer($connector);
$printer -> text("Hello World!\n");
$printer -> cut();
$printer -> close();
*/

function formatString($intextLeft, $intextRight) {
    $eventualStringOutput = ""; //Will everntually return this string
    $ourdot = " ";  //Use this as insertion
    $dot2 = "-";
    $dotbool = true;
    
    $intextLeft = (String)$intextLeft;
    $intextRight = (String)$intextRight;
    $Maxlength = 49;  //Max Length to go from the left to the right
    $minimumdots = 5; //we want at least 5 dots between title and price
    
    
    $leftnum = strlen($intextLeft);
    $rightnum = strlen($intextRight);
    
    $leftforrightandleft = $Maxlength - $minimumdots; //WE want those five between spots so we wonly have this much space
    
    //Get the space that is left to calc if we can fit the entire string
    $spaceafterleft = $leftforrightandleft - $rightnum;
    
    //If leftnum is less than spaceleft then add the dots as difference ot the right of textleft
    if ($leftnum < $spaceafterleft) {
        //#left most string has been created.
        $eventualStringOutput = $eventualStringOutput . $intextLeft;
        
        //Fill in the middle
        $difference = $spaceafterleft - $leftnum;
        while($difference + $minimumdots > 0) {
            //Flip between our dots. Cause we fancy huh.
            if ($dotbool) {
                $eventualStringOutput = $eventualStringOutput . $ourdot;
                $dotbool = !$dotbool;
            }
            else {
                
                $eventualStringOutput = $eventualStringOutput . $dot2;
                $dotbool = !$dotbool;
            }
            $difference -= 1;
        }
        
    }
    //if leftnum is more than spaceleft then only use the spaceafter amount of characters
    else
    {
        //Get the first part of our too long to fit string
        $eventualStringOutput = substr($intextLeft, 0, $spaceafterleft);
        
        //Fill in the middle
        while($minimumdots) {
            //Flip between our dots. Cause we fancy huh.
            if ($dotbool) {
                $eventualStringOutput = $eventualStringOutput . $ourdot;
                $dotbool = !$dotbool;
            }
            else {
                
                $eventualStringOutput = $eventualStringOutput . $dot2;
                $dotbool = !$dotbool;
            }
            $minimumdots -= 1;
        }
    }
    
    //Finish the right side
    $eventualStringOutput = $eventualStringOutput . $intextRight;
   
    return $eventualStringOutput;
}


function printItemLine($printer, $item, $price) {
    $printer -> text(formatString($item, $price . "\n"));
}


try {
        //Max length 49 for our sheet. when text size is 1 and 1 
        
    
        $printer ->setTextSize(3, 3);
        $printer ->setJustification(1);
        $printer -> text("Anna's Test\n");
        $printer ->setTextSize(1, 1);
        
        $printer ->setJustification(1);
        $printer -> text("4424 Princton Ave, 19136 Philadelphia PA\nCome See Us!\n\n");
        
        $printer ->setJustification(2);
        printItemLine($printer, "Double Checking", "1.99");
        $printer -> text(formatString("Expensice Golden Taco", "274.99\n"));
        $printer -> text(formatString("ID", "2.99\n"));
        $printer -> text("\n\n\n\n");
        $printer ->setJustification(2);
        
        //Print Ed Cockiness
        $printer ->setTextSize(3, 3);
        $printer -> text("\nMark is the man!\n");
        $printer -> text("\n\n\n\n");
        $printer -> cut();
} finally {
    $printer -> close();
}

?>