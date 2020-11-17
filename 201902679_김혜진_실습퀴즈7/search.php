<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $e_key = json_encode($_POST);
        $d_key = json_decode($e_key,true);
        $key = $d_key["key"];
        $myFile = fopen("data.json","r") or die("unable to open file");

        $titles = array();
        while(!feof($myFile)){
            $t_data = fgets($myFile);
            $turned = json_decode($t_data,true);
            if(stristr($turned["title"], $key) != false){
                array_push($titles, $turned["title"]);
            }
            $changed = json_encode($titles);
        }
        echo $changed;
    }
?>