<?php
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        session_start();
        $firstEncoded = json_encode($_POST);
        $decoded = json_decode($firstEncoded, true);

        $blockInfo = explode('/', $decoded["id"]);
        $dateInfo = explode('-',$blockInfo[0]);
        $title = $blockInfo[1];

        $userID = $_SESSION["userID"];

        $fileName = "./toDoList/".$userID."_".$dateInfo[0].$dateInfo[1].".json";

        $rewrite = array();

        if(file_exists($fileName)){
            $my = fopen($fileName,"r") or die("unable to open file");
            while(!feof($my)){
                $fileData = fgets($my);
                $decoded_fileData = json_decode($fileData,true);

                if( !($decoded_fileData["date"]== $blockInfo[0] && $decoded_fileData["title"] == $title) ){
                    array_push($rewrite,$fileData);
                }
            }
            fclose($my);

            $my = fopen($fileName,"w") or die("unable to open file");

            if(count($rewrite) == 1){
                fclose($my);
                unlink($fileName);
            }else{
                for($i=0; $i<count($rewrite); $i++){
                    fwrite($my,$rewrite[$i]."\n");
                }
                fclose($my);
            }
            echo "삭제되었습니다.";
            return;
            
        }
    }
?>