<?php

/* 
 * Ok So this baby will utilize that sweet sweet class from mike42
 * We will have a printer class that will take a transaction class and run it through the transcaction class
 * Next, you push the data to its proper databases. then lastly you may print here. 
 * OR 
 * We get it from a script that is used to pull old tranascactions to reprint them for the customer.
 */
require '/var/www/html/EVpos/escpos-php-development/autoload.php';
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\Printer;
use Mike42\Escpos\EscposImage;




class EvPrinter {
    
    private $printer;
    private $logo;
    
    public function setup() { 
       $connector = new NetworkPrintConnector("192.168.1.100", 9100);     
       $this->printer = new Printer($connector); 
       
       $this->logo = EscposImage::load("annaslogo-min2.png", false);
       
    }
    
    
    
    
    //Text we want on the left
    //Text we want on the right
    //Max characters for string
    //minimum dots we want between the two text inputs
    //we keep two dots going. they cycle between the two. use spaces for blank. 
    function formatItemLine($intextLeft, $intextRight, $Maxlength=48, $minimumdots=5, $ourdot=" ", $dot2="-") {
        $eventualStringOutput = ""; //Will everntually return this string 
        $dotbool = true;
        
        $intextLeft = (String)$intextLeft;
        $intextRight = (String)$intextRight;


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

        return $eventualStringOutput . "\n";
    }


    function printItemLine($item, $price, $Maxlength=48, $minimumdots=5, $ourdot=" ", $dot2=" ") {
        $this->printer -> text($this->formatItemLine($item, $price, $Maxlength, $minimumdots, $ourdot, $dot2));
    }

    
    
    function  testprinter() {
        try {
                //Max length 49 for our sheet. when text size is 1 and 1 


                $this->printer ->setTextSize(3, 3);
                $this->printer ->setJustification(1);
                $this->printer -> text("Anna's Test\n");
                $this->printer ->setTextSize(1, 1);

                $this->printer ->setJustification(1);
                $this->printer -> text("4424 Princton Ave, 19136 Philadelphia PA\nCome See Us!\n\n");

                $this->printer ->setJustification(2);
                $this->printItemLine("Double Checking", "1.99");
                $this->printer -> text($this->formatItemLine("Expensice Golden Taco", "274.99"));
                $this->printer -> text($this->formatItemLine("ID", "2.99"));
                $this->printer -> text("\n\n\n\n");
                $this->printer ->setJustification(2);

                //Print Ed Cockiness for finding a package online and copying and pasting it into this thing. 
                $this->printer ->setTextSize(3, 3);
                $this->printer -> text("\nMark is the man!\n");
                $this->printer -> text("\n\n\n\n");

        } finally {

            //Cut and close our printer action
            $this->printer -> cut();
            $this->printer -> close();
        }

    }
    
    function closePrinter() {
        $this->printer -> cut();
        $this->printer -> close();
    }
    
    
    
    
    function printHeader() {
        
        $this->printer ->bitImage($this->logo);
        
        $this->printer ->setJustification(1);
        $this->printer ->setTextSize(1, 1);
        $this->printer -> text("4424 Princton Ave, 19136 Philadelphia PA\nCome See Us!\n\n\n\n\n");
    }
    

//Print the items in the list
    function printItemList($items) {
        //Print each item
        foreach($items as $item) {
            $this->printItemLine($item->amount . " - " . $item->name, $item->price);
        }
        
        $this->printer -> text("\n");
    }
    
    function printTotal($transaction) {
        $this->printer ->setTextSize(1, 1); //Set text to normal
        $this->printer ->setJustification(2); //right side align
        
        $this->printItemLine("Subtotal:", $transaction->subtotal, 24);
        $this->printItemLine("taxes:", $transaction->taxes, 24);
        $this->printItemLine("Total:", $transaction->price, 24);
    }
    
    function printFooter() {
        $this->printer ->setJustification(1); //right side align
        $this->printer ->setTextSize(3, 3);
        $this->printer -> text("\nThank You!\n");
    }
    
    
    function printReceipt($transaction) {
        $this->printHeader();
        $this->printer->pulse();
        $this->printItemList($transaction->items);
        $this->printTotal($transaction);
        $this->printFooter();
        $this->closePrinter();
        
    }


}



$transaction = json_decode(filter_input(INPUT_POST, 'transaction'));




$newEVprinter = new EvPrinter();
echo "Hi";
$newEVprinter->setup();
echo "Hi";
$newEVprinter->printReceipt($transaction);
echo "hi3";


//echo json_encode($transaction);
?>