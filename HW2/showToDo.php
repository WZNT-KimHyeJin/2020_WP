<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    session_start();
    $firstEncoded = json_encode($_POST);
    $decoded = json_decode($firstEncoded, true);
    $fileYear = substr($toDate,0,4);
    $saveArr = array();
    foreach($decoded as $a => $b){
        $test += $b;
    }
    Sun Nov 29 2020 10:39:00 GMT+0900
    echo $decoded["mon"];
}
?>