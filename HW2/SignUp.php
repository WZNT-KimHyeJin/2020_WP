<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST"){

    function test_input($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

      $en = json_encode($_POST);
      $data = json_decode($en,true);
      $fileName = "./data/person.json";
      if(file_exists($fileName)){
          $myFile = fopen($fileName,"r") or die("unable to open file");
          while(!feof($myFile)){
              $file_data = fgets($myFile);
              $decode = json_decode($file_data,true);
    
              if($decode["id"] == $data["id"]){
                  fclose($myFile);
                  echo "이미 아이디가 존재합니다.";
                  return;
                }
            }
        }
        $myFile = fopen($fileName, "a")or die("unable to open file");
        $encoded = json_encode($data);
        fwrite($myFile,$encoded."\n");
        fclose($myFile);
        echo "회원 가입이 완료되었습니다.";
    }
?>