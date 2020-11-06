<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $_SESSION['userID'];
    $changedPW = $_POST['changedPw'];
    $changedArr = array();
    $decodedArr = array();
    $count=0;
    
    $myFile = fopen("data/person.json","r") or die("unable to open file");
    while(!feof($myFile)){
        $f_data = fgets($myFile);
        $decoded = json_decode($f_data,true);
        
        
        if($decoded["id"] == $userId){
            $decoded["pw"] = $changedPW;
        }
        $keep = array("id"=>$decoded["id"], "pw"=>$decoded["pw"]);

        $decodedArr[$count] = $keep;
        $count++;
    }
    fclose($myFile);
}

    $myFile = fopen("data/person.json","w") or die("unable to open file");
    for($i=0;$i<count($decodedArr)-1;$i++){
        $encoded = json_encode($decodedArr[$i]);
        fwrite($myFile,$encoded."\n");
        
    }
    echo "비밀번호 변경이 성공적으로 완료되었습니다.";
    fclose($myFile);


?>
    