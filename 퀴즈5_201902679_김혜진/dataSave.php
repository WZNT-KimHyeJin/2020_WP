<?php  
$file_name = $file_contents =" ";
$Err =" ";
$myFiles = fopen("data.txt","r") or die("unable to open file");
$same_file_name_check = 0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(!empty($_POST["Fname"]) && !empty($_POST["Fcontents"])){
        $file_name = $_POST["Fname"]."\n";
        $file_contents = $_POST["Fcontents"]."\n";
        
        while(!feof($myFiles)){
            $f_data = fgets($myFiles);

            if($file_name == $f_data){
                $same_file_name_check=1;
                fclose($myFiles);
                break; 
            }else{
                $same_file_name_check=0;
            }
        }

        if($same_file_name_check ==1 ){
            echo "저장되지 않았습니다.<br>";
            echo "이전에 같은 화일이름으로 저장된 정보가 있습니다.";
        }elseif($same_file_name_check ==0){
            $myFiles = fopen("data.txt","a");
            
            fwrite($myFiles, $file_name);
            fwrite($myFiles, $file_contents);
     
            
            echo "저장되었습니다.";
            fclose($myFiles);
        }


    }else{
        $Err = "입력란을 확인 해 주십시오.";
        echo "아직 예외처리 안함.";
    }
  }
?>
