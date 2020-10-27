<!DOCTYPE html>
<html>
<body>
<h2>숫자 맞추기 게임</h2>
당신이 생각한 숫자를 컴퓨터가 맞추는 게임입니다.<br><br>

<?php
$userNumber = 7;                   // 당신이 생각하는 숫자를 넣으시오.

function numgame() {
    $checkArr = array();
    global $userNumber;
    $opportunity = 0;

    while($opportunity < 15){

        $cp_prediction = rand(1,15);
        
        while(isset($checkArr[$cp_prediction])){
            $cp_prediction = rand(1,15);
        }

        echo "<br>The Number is " . $cp_prediction;
        $checkArr[$cp_prediction] = 1;
        
        if($userNumber == $cp_prediction){
            echo "<br>correct!!!";
            echo "<br>Game opportunity :" . $opportunity . "times" ;
            break;
        }else{
            echo "<br>fail";
        }
        
        echo "<br>";
    }
    
}
numgame();
?>

</body>
</html>
