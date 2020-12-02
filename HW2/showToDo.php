<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    session_start();
    $firstEncoded = json_encode($_POST);
    $decoded = json_decode($firstEncoded, true);

    $dataArr = array();
    $dataArr[0] = $decoded["sun"];
    $dataArr[1] = $decoded["mon"];
    $dataArr[2] = $decoded["tue"];
    $dataArr[3] = $decoded["wed"];
    $dataArr[4] = $decoded["thu"];
    $dataArr[5] = $decoded["fri"];
    $dataArr[6] = $decoded["sat"];
    
    $dataArr[0] = json_decode($dataArr[0], true);
    $dataArr[1] = json_decode($dataArr[1], true);
    $dataArr[2] = json_decode($dataArr[2], true);
    $dataArr[3] = json_decode($dataArr[3], true);
    $dataArr[4] = json_decode($dataArr[4], true);
    $dataArr[5] = json_decode($dataArr[5], true);
    $dataArr[6] = json_decode($dataArr[6], true);


    $userID =  $_SESSION["userID"];

for($i =0; $i<7; $i++){
    $day = $dataArr[$i];

    $returnArr = array();
    $fileName = "./toDoList/".$userID."_".$day["fileName"].".json";
    
    if(file_exists($fileName)){
        $myfile = fopen($fileName,"r") or die("unable to open file");
        while(!feof($myfile)){
            
            $fileData = fgets($myfile);
            $decoded_fileData = json_decode($fileData,true);
            if( $decoded_fileData["date"]== $day["date"] ){
                fclose($myfile);
                $returnArr["title"] = $decoded_fileData["title"];
                $title = json_encode($returnArr);

                echo $title;
            break;
            }else{
                echo 0;
            }
        }
    }else{
        echo 0;
    }

}

   
}
?>