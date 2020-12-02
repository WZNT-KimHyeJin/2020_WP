<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    session_start();
    $firstEncoded = json_encode($_POST);
    $decoded = json_decode($firstEncoded, true);

    $updateDate = $decoded["date"];
    $updateTime = $decoded["time"];
    $updateTItle = $decoded["title"];
    $updateDes = $decoded["description"];

    $orginfo =$decoded["id"]; // 날짜와 title

    $orginfo = explode('/',$orginfo); //0 = date, 1 = title
    $orgDateInfo = explode('-',$orginfo[0]); //0:year 1:month 2:date
   
    $updateInfo = array(
        "date" => $updateDate,
        "time" => $updateTime,
        "title" => $updateTItle,
        "description" => $updateDes
    );

    $userID =$_SESSION["userID"];

    $updateDateInfo = explode('-',$updateDate);
    $fileNameToMove = "./toDoList/".$userID."_".$updateDateInfo[0].$updateDateInfo[1].".json";


    $fileContentsToSave =array();
    $fileContentToMove;

    $fileName = "./toDoList/".$userID."_".$orgDateInfo[0].$orgDateInfo[1].".json";
    
    if(file_exists($fileName)){
        $my = fopen($fileName,"r") or die("unable to open file");
        while(!feof($my)){
            
            $fileData = fgets($my);
            $decoded_fileData = json_decode($fileData,true);

            if( $decoded_fileData["date"]== $orginfo[0] && $decoded_fileData["title"] == $orginfo[1]){
                $fileContentToMove = $fileData;
            }else{
                array_push($fileContentsToSave,$fileData);
            }
        }
        fclose($my);

        ////////기존파일에 옮길 파일 제외하고 다시 쓰기///////////

        $my = fopen($fileName,"w") or die("unable to open file");
        if(count($fileContentsToSave) == 1){
            fclose($my);
            unlink($fileName);
        }else{
            for($i=0; $i< count($fileContentsToSave); $i++){
                fwrite($my,$fileContentsToSave[$i]);
            }
            fclose($my);
        }

        /////////////파일 옮기기//////////////////////////

        // if(file_exists($fileNameToMove)){
            $moveFile = json_encode($updateInfo);
            $my = fopen($fileNameToMove,"a") or die("unable to open file");
            fwrite($my,$moveFile."\n");
            fclose($my);
            echo $moveFile;
        // }


    }



    


   
}
?>