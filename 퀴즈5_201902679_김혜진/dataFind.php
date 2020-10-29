<?php
$array = array();
$infoArray = array(); // 정보 저장. 
$contentsArray = array(); // 탐색용
$searchedArray = array(); // 찾은 정보 저장
$explodeCount =0;
$count=0;
$sorting=0;

$myFiles = fopen("data.txt","r");
while(!feof($myFiles)){
    $f_data = fgets($myFiles);
    $array[$count] = $f_data;
    $count++;
}
for($i=0;$i<count($array)-1;$i+=2){
    $infoArray[$array[$i]] = $array[$i+1];
} 



if ($_SERVER["REQUEST_METHOD"] == "POST") {
   

    if(!empty($_POST["search_Name"]) && !empty($_POST["search_Word"]) && !empty($_POST["sorting"]) ){
        $S_Name = $_POST["search_Name"];
        $S_Word = $_POST["search_Word"];

        foreach($infoArray as $a => $b){
            if(strpos($a,$S_Name) !==  false){ //이름을 가지고 있으면
                $checkArr = explode(" ",$b); //문장 찢어서 배열로
                $checkNum = 0; // 개수 체크
                for($i=0;$i<count($checkArr);$i++){
                    if(strcasecmp($checkArr[$i],$S_Word)==0){
                        $checkNum++;
                    }
                }
                if($checkNum>0){
                    $searchedArray[$a] = $checkNum;
                } // 탐색완료

            }
        }

    }

    switch($_POST["sorting"]){
        case "Ascending" : 
            asort($searchedArray); 
        break;

        case "Descending":
            arsort($searchedArray);
        break;
    }

    foreach ( $searchedArray as $a => $b ) {
    echo "ㆍ".$a. ':' .$infoArray[$a]. '<br>';
    }  
}


   
?>