<?php
require_once('scripts/rb.php');
R::setup( 'mysql:host=localhost;dbname=auto', 'dankelly', 'password' );
$error='No Error'; // Variable To Store Error Message
session_start(); // Starting Session
        
#Check for a submit post data
if (isset($_POST['test'][0][0])) {
     echo"Pass Test 1 <br>";
    #Check to see if a username and password was submitted.
    if (empty($_POST['test'][0][1]) || empty($_POST['test'][0][2])) {
        $error = "Username or Password is invalid";
    }
    else
    {
        
         
        // Define $username and $password
        $username=$_POST['test'][0][1];
        $password=$_POST['test'][0][2];
        // To protect MySQL injection for Security purpose
        $username = stripslashes($username);
        $password = stripslashes($password);
        #$query = "Select * from login WHERE username = ".$username." AND password = ".$password.";";
        #$loginsFound = R::getAll( 'select * from login where username = :username', 
        #            array(':username'=>$username) );
        $loginsFound = R::find( 'login', ' username = ? ', [ $username ] );
        var_dump($loginsFound);
        
        echo "<br><br>";
        
        
        foreach ($loginsFound as $user)
        {
            if (password_verify($password, $user->password))
            {   
                #password accepted
                $_SESSION['user']=$username; // Initializing Session
                header('Location: http://192.168.1.100/EVpos/Menu.php'); // Redirecting To Other Page
            }
            else
            {
                #password failed
                $error = "Username or Password is invalid";
                header('Location: http://192.168.1.100/EVpos/index.php'); // Redirecting To Other Page
            }
            break; #Because we should only have one result anyway.
        }
        
        
        #$loginsFound = R::getAll($query);
        #$loginsFound = R::findOne('login', ' username = ? AND password = ?', [ $username, $password ] );
        
        
        /*
        if (count($loginsFound) == 0)
        {
            
        }
        else 
        {
            
        }
        */
    }
}
 else {
    echo "Nope <br>";
}

echo ($error);