<?php
if($_POST['BookName'] == ""){
    echo "<script>
          alert(\"상품이름을 입력하지 않았습니다.\");
          history.back();
          </script>";
}
else if($_POST['price'] == ""){
    echo "<script>
          alert(\"가격을 입력하지 않았습니다.\");
          history.back();
          </script>";
}
else if($_POST['number'] == ""){
    echo "<script>
          alert(\"수량을 입력하지 않았습니다.\");
          history.back();
          </script>";
}
else{
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    if(isset($_POST["submit"])) {
      $check = getimagesize($_FILES["file"]["tmp_name"]);
      if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
      } else {
        echo "File is not an image.";
        $uploadOk = 0;
      }
    }
if (file_exists($target_file)) {
    $uploadOk = 0;
}
if ($_FILES["fileToUpload"]["size"] > 500000000) {

    $uploadOk = 0;
}


if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {

    $uploadOk = 0;
}

if ($uploadOk == 0) {
    // echo   "<script>
    //       alert(\"파일을 업로드하지 않았습니다..\");
    //       history.back();
    //       </script> ";
}
    else{
        if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)){
            echo "저장되었습니다.";
            $name = $_POST['BookName'];
            $price = $_POST['price'];
            $number = $_POST['number'];
            $file = basename($_FILES['file']['name']);

            $fp = fopen('./booklist.txt','a');
            $str = $name."|".$price."|".$number."|".$file."\n";

            fwrite($fp,$str);
            fclose($fp);
        }
        else{
            echo "<script>
        alert(\"파일이 업로드 되지 않았습니다.\");
        history.back();
        </script>";
        }
    }
}
?>

<br>
<form action ="main.html" method ="post">
    <input type ="submit" value ="돌아가기"/>
</form>