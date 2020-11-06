<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    $Id = $_POST["userId"];
    $Pw = $_POST["userPw"];
    $check =0;

    $myFile = fopen("data/person.json","r") or die("unable to open file");
    while(!feof($myFile)){
        $f_data = fgets($myFile);
        $decoded = json_decode($f_data,true);
        
        if($decoded["id"] == $Id){
            if($decoded["pw"] == $Pw){
                $_SESSION['userID'] = $Id;
                $check =1;
                break;
            }
        }
    }
    fclose($myFile);
    
    if($check==0){
        echo "입력하신 id가 존재하지 않거나 패스워드가 틀립니다.";
        
    }elseif($check==1){
        echo "<b name='userId'>".$Id."</b>";
        echo "님 로그인이 되었습니다.<br>";
        echo "<button type='submit' name='BT_chPw' onClick="."location.href='change_pw.html'".">"."비밀번호 변경"."</button>";
    }
}
?>
