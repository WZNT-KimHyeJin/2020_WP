<?php
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        session_start();
        
        function test_input($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }

        $fst = json_encode($_POST);
        $inputData = json_decode($fst,true);
       

       

        $fileName = "./data/person.json";
        if(file_exists($fileName)){
            $myFile = fopen($fileName,"r") or die("unable to open file");
            while(!feof($myFile)){
                $file_data = fgets($myFile);
                $decode = json_decode($file_data,true);
      
                if($decode["id"] == $inputData["id"] && $decode["pw"] == $inputData["pw"]){
                    fclose($myFile);
            
                    $dir = "./toDoList";
                    $handle = opendir($dir);
                    $filesInDir = array();
                    while(false !== ($fNameInDir = readdir($handle))){
                        if($fNameInDir == "." || $fNameInDir == ".."){
                            continue;
                        }
                        if(is_file($dir."/".$fNameInDir)){
                            $filesInDir[] = $fNameInDir;
                        }
                    }
                    closedir($handle);
                    
                    $existCount =0;
                    foreach($filesInDir as $f){
                        if(strpos($f, $decode['id']) !== false){
                            $existCount ++;
                        }
                    }
                    $decode["toDo"] = $existCount;
                    $returnData = json_encode($decode);

                    $_SESSION['userID'] = $decode['id'];

                    echo $returnData;
                    return;

                }
            }
        }
    }
?>