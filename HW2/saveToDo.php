<?php
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        session_start();

        function test_input($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        $jsonEn = json_encode($_POST);
        $jsonDe = json_decode($jsonEn, true);
        
        $loginedId = $_SESSION["userID"];
        $toDate = $jsonDe["date"];
        $fileYear = substr($toDate,0,4);
        $fileMonth = substr($toDate,5,2);

        $fileName = "./toDoList/".$loginedId."_".$fileYear.$fileMonth.".json";

        $writeFile = fopen($fileName,"a") or die("unable to open file");
        $reEn = json_encode($jsonDe);
        fwrite($writeFile, $reEn."\n");
        fclose($writeFile);
        echo $reEn;
        return;
        
    }
?>