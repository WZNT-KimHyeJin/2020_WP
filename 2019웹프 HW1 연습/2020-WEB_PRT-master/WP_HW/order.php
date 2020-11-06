<?php

$lines = @file("./booklist.txt") or $result = "파일을 읽을 수 없습니다.";

for($i=0; $i<count($lines); $i++){
    $BookList[$i] = explode('|',$lines[$i]);
    //explode => '이거' 안의 문자를 기준으로 조각냄
}
// txt 파일의 줄 수를 반환하는 것이 count 함수

for($i=0;$i<count($BookList);$i++){
    $BookName[$i] = $BookList[$i][0];
    $BookPrice[$i] = $BookList[$i][1];
    $BookNumber[$i] = $BookList[$i][2];
    $BookImage[$i] = $BookList[$i][3];
}

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>도서주문 페이지</title>
        <link rel="stylesheet" href="./Main1.css">
    </head>

    <body>

    <h1>도서 주문페이지</h1>

    구매자 아이디 : <input type="text" />
    <br />
    <br />  
  
    <input type="checkbox" id="allCheck" onClick="allCheck()"/> 모두 선택 <br />

    <table>
        <tr id="firstValue">
            <td>선택</td> <td>상품명</td> <td>미리보기</td> 
            <td>정가</td> <td>수량</td> <td>합계</td>
        </tr>
        <?php
        for ($i = 0; $i<count($lines); $i++){
            $price = $BookPrice[$i] * $BookNumber[$i];
            echo "<tr>
            <td>
                <input type=checkbox class=chk onClick=check()>
            </td>
            <td class=bookname>$BookName[$i]</td>
            <td><button><a href=uploads/$BookImage[$i]>미리보기</a></button></td>
            <td>$BookPrice[$i]</td>
            <td>
                <input type = text value=$BookNumber[$i] class = 'input' /> 
                <input type = button value=변경 onClick = checkNumber() class=but />
            </td>
            <td class=price>$price</td>
            </tr>
            ";
        }
        ?>
        <tr>
            <td colspan ='5'  style="font-weight : bold">선택한 총 상품금액</td><td id="all">0</td>
        </tr>
    </table>
    
    <p>
      총 <span id="allNumber" >0</span> 개 상품 선택
    </p>
    <input type="button" value="삭제하기" id="removeTable">
    <input type="submit" value="주문하기" id="submit">

    <script type="text/javascript" src='./test.js'></script>
    </body>

</html>