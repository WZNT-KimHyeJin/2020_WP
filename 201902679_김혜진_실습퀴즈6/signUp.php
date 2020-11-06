<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Id = $_POST["userId"];
    $Pw = $_POST["userPw"];
    $check =0;

    $myFile = fopen("data/person.json","r") or die("unable to open file");
    while(!feof($myFile)){
        $f_data = fgets($myFile);
        $decoded = json_decode($f_data,true);
        
        if($decoded["id"] == $Id){
            echo "이미 아이디가 존재합니다.";
            $check =1;
        break;
        }
    }
    fclose($myFile);
    
    if($check==0){
        $myFile = fopen("data/person.json","a") or die("unable to open file");
        $array = array("id"=>$Id, "pw"=>$Pw);
        $signUp = json_encode($array);
        fwrite($myFile,$signUp."\n");
        fclose($myFile);
        echo "회원 가입이 완료되었습니다.";
    }
}
?>