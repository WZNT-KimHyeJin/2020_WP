<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = json_encode($_POST);
        
        $myFile = fopen("data.json","a") or die("unable to open file");
        fwrite($myFile,$data."\n");
        fclose($myFile);
        echo $data ;
        
    }
?>