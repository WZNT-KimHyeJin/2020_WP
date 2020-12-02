<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    session_start();
    $firstEncoded = json_encode($_POST);
    $decoded = json_decode($firstEncoded, true);

    $data = $decoded["day"];
    $num = $decoded["num"];
    
    $data = json_decode($data, true);
    $userID =  $_SESSION["userID"];


    $returnArr = array();
    $arrCount =0;
    $fileName = "./toDoList/".$userID."_".$data["fileName"].".json";
    $returnData = array();
    
    if(file_exists($fileName)){
        $my = fopen($fileName,"r") or die("unable to open file");
        while(!feof($my)){
            
            $fileData = fgets($my);
           
            if($fileData ==" "){
            break;
            }
            $decoded_fileData = json_decode($fileData,true);


            if( $decoded_fileData["date"]== $data["date"] ){
                $returnData = array("title" => $decoded_fileData["title"], "num" => $num, "date" => $data["date"]);
                $returnData = json_encode($returnData);
                $returnArr += array($arrCount => $returnData);
                $arrCount++;
                
            }
        }
        fclose($my);

        if($arrCount>0){
            $returnArr["title"] = 1;
            $returnArr = json_encode($returnArr);
            echo $returnArr;
            return;
        }else{
            $returnArr["title"] = 0;
            $returnArr = json_encode($returnArr);
            echo $returnArr;
            return;
        }
    }else{
        $returnArr["title"] = 0;
        $returnArr = json_encode($returnArr);

        echo $returnArr;
        return;
    }



    


   
}
?>