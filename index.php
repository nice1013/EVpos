<!DOCTYPE html>


<?php
session_start();

echo $_SESSION['user'];


if (isset($_SESSION['user']) && strlen($_SESSION['user']) > 0) {
     #password accepted
    header('Location: http://192.168.1.100/EVpos/Menu.php'); // Redirecting To Other Page
}
?>

<html>
    <head>
        <title>EVpos</title>
        <link rel="stylesheet" href="css/login.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        
        <div class="login">
        <h1>EVpos</h1>
        <form action="login.php" method="post">
        <input type="text" placeholder="Username" name="test[0][1]" >  
        <input type="password" placeholder="password" name="test[0][2]">  
        <input type="submit" name="test[0][0]" value="Sign In" placeholder="password">
        </form>
        </div>
        <div class="shadow"></div>

    </body>
</html>
