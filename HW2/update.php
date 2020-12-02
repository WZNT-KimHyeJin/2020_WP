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
        echo "1. 해당 파일 존재 \n";
        $my = fopen($fileName,"r") or die("unable to open file");
        while(!feof($my)){
            
            $fileData = fgets($my);
            $decoded_fileData = json_decode($fileData,true);

            if( $decoded_fileData["date"]== $data[$orginfo[0]] && $decoded_fileData["title"] == $orginfo[1]){
                $fileContentToMove = $fileData;
                echo "2_2. 옮기고자 하는 값 발견\n";
            }else{
                array_push($fileContentsToSave,$fileData);
                echo "2_1 값 불일치\n";
            }
        }
        fclose($my);
        echo "3. 탐색 종료\n";

        ////////기존파일에 옮길 파일 제외하고 다시 쓰기///////////

        $my = fopen($fileName,"w") or die("unable to open file");

        for($i=0; $i< count($fileContentsToSave); $i++){
            fwrite($my,$fileContentsToSave[$i]);
            echo "4. 파일 수정하디\n";
        }
        fclose($my);

        /////////////파일 옮기기//////////////////////////

        if(file_exists($fileNameToMove)){
            echo "5. 파일 존재 옮기기 시작 \n";
            $moveFile = json_encode($updateInfo);
            echo "6. 파일 인코딩\n";
            $my = fopen($fileNameToMove,"a") or die("unable to open file");
            fwrite($fileNameToMove,$moveFile);
            echo "7. attatch\n";

            fclose($fileNameToMove);
            echo $moveFile;

        }


    }



    


   
}
?>