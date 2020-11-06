function check(){
    var count = 0;
    var allPrice = 0;
    for(var i = 0; i< document.getElementsByClassName('chk').length; i++){
        if(document.getElementsByClassName('chk')[i].checked == true){
            count++;
            allPrice += Number(document.getElementsByClassName('price')[i].innerHTML);
        }
    }

    document.getElementById('allNumber').innerHTML = count;
    document.getElementById('all').innerHTML = allPrice;
    if(count == document.getElementsByClassName('chk').length){
        document.getElementById('allCheck').checked = true;
    }
    else{
        document.getElementById('allCheck').checked = false;
    }
}

function allCheck(){
    var allPrice = 0;
    if(document.getElementById('allCheck').checked == true){
        for(var i = 0; i<document.getElementsByClassName('chk').length;i++){
            if(document.getElementsByClassName('chk')[i].checked !== true){
                document.getElementsByClassName('chk')[i].checked = true;
            }
            allPrice += Number(document.getElementsByClassName('price')[i].innerHTML);
        }
        document.getElementById('allNumber').innerHTML = document.getElementsByClassName('chk').length;
        document.getElementById('all').innerHTML = allPrice;
    }
    else{
        for(var i = 0; i<document.getElementsByClassName('chk').length;i++){
            if(document.getElementsByClassName('chk')[i].checked == true){
                document.getElementsByClassName('chk')[i].checked = false;
            }
        }
        document.getElementById('allNumber').innerHTML = 0;
        document.getElementById('all').innerHTML = 0;
    }
}
input = [];
input2 = [];
for(var i = 0; i<document.getElementsByClassName('chk').length; i++){
    input.push(document.getElementsByClassName('input')[i].value);
    input2.push(document.getElementsByClassName('bookname')[i].innerHTML);
}

function checkNumber(){
    var count = 0;
    var check = event.target.parentNode.parentNode.childNodes[1].childNodes[1];
    var allPrice = 0;

    if(check.checked == false){
        check.checked = true;
    }
    for(var i = 0; i< document.getElementsByClassName('chk').length ; i++){
        if(document.getElementsByClassName('chk')[i].checked == true){
            count++;
            allPrice += Number(document.getElementsByClassName('price')[i].innerHTML);
        }
    }
    if(count == document.getElementsByClassName('chk').length){
        document.getElementById('allCheck').checked = true;
    }
    document.getElementById('allNumber').innerHTML = count;
    document.getElementById('all').innerHTML = allPrice;

    let previousValue = event.target.parentNode.childNodes[1].value;
    let previousName = event.target.parentNode.parentNode.childNodes[3].innerHTML;

    var findNumber = 0;
    for(var i = 0; i< document.getElementsByClassName('chk').length ; i++){
        if(input[i] == previousValue && previousName == input2[i]){
            findNumber = i;
        }
    }
    console.log(findNumber)
    if(check.checked == true && previousValue == input[findNumber]){
        alert("수량을 변경하지 않았습니다.");
    }else{
        allPrice=0;
        event.target.parentNode.parentNode.childNodes[11].innerHTML
             = previousValue * Number(event.target.parentNode.parentNode.childNodes[7].innerHTML);
        for(var i=0;i< document.getElementsByClassName('chk').length;i++){
            if(document.getElementsByClassName('chk')[i].checked==true){
                allPrice += Number(document.getElementsByClassName('price')[i].innerHTML);
            }
        }
        document.getElementById('all').innerHTML=allPrice;
    }
}

// var : 변경 가능 let : 중복정의를 하면 오류뜸. 
/*
var a=10;
var a=20;
=> a=20
중복정의 가능 값바꾸기 가능

let a=10;
let a=20;
=> 오류
a=20 : 값 변경

const a=10 : final 값 변경, 중복 정의 x

 */
