var loginBtn = document.getElementById("loginBtn");
var signInBtn = document.getElementById("signInBtn");
var addBtn = document.getElementById("addBtn");
var joinBtn = document.getElementById("joinBtn");

var saveBtn = document.getElementById("saveBtn");
var updataBtn = document.getElementById("updataBtn");
var submitBtn =document.getElementById("submitBtn");
var deleteBtn = document.getElementById("deleteBtn");
var cancleBtn = document.getElementById("cancleBtn");

var joinBackDiv = document.getElementById("joinBackDiv");
var addBackDiv = document.getElementById("addBackDiv");

var inputId = document.getElementById("inputId");
var inputPw = document.getElementById("inputPw");
var logined_Id = document.getElementById("logined_Id");
var dates = document.getElementsByClassName("dates");
var yearSpan = document.getElementById("yearSpan");
var monthSpan = document.getElementById("monthSpan");
var add_date = document.getElementById("add_date");
var table_data = document.getElementsByClassName("table_data");

var showedDates = Array();


function checkInput(id,pw){
    var IdCheck = /^([A-Za-z0-9]){6,15}/
    var PwCheck = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*/
    if(!IdCheck.test(id) || !PwCheck.test(pw)){
        return false;
    }else{
        return true;
    }
}
function loginOK(id){
    addBtn.disabled = false;
    var textID = document.createTextNode(id);
    logined_Id.appendChild(textID);
    var todayDate = new Date();
    checkToday(todayDate);
}
function checkToday(today){
    var getDay = today.getDay();
    var getDate = today.getDate();
    var sunday = new Date();
    switch(getDay){
        case 0:
            sunday.setDate(getDate);
            setDates(sunday);
            break;
        case 1 :
            sunday.setDate(getDate-1);
            setDates(sunday);
            break;
        case 2 : 
            sunday.setDate(getDate-2);
            setDates(sunday);
            break;
        case 3 : 
            sunday.setDate(getDate-3);
            setDates(sunday);
            break;
        case 4 : 
            sunday.setDate(getDate-4);
            setDates(sunday);
            break;
        case 5 : 
            sunday.setDate(getDate-5);
            setDates(sunday);
            break;
        case 6 : 
            sunday.setDate(getDate-6);
            setDates(sunday);
            break;        
    }

}
function setPostString(year, month, day){
    var returnString;
    var fileNameString;
    var dateString;

    year = year.toString();
    month = month.toString();
    day = day.toString();

    //set month    
    if(month<10){
        strMonth = "0" + month.toString();        
    }
    if(day<10){
        strDay = "0"+day.toString();
    }
    fileNameString = year + month;
    dateString = year+"-"+month+"-"+day;

    returnString= {
        "fileName" : fileNameString,
        "date" : dateString
    };
    return returnString;

}
function setDates(Sunday){ // 화면 달력에 나타나는 날짜 계산
    console.log("stdDate = "+Sunday);
    showedDates.length =0; // 화면에 보여지는 Date를 저장하는 배열 초기화
    var stdDate = new Date();
    var months;
    var years;
    stdDate.setDate(Sunday.getDate());
    for(var i=0; i<7;i++){
        showedDates[0] = setPostString(Sunday.getFullYear, Sunday.getMonth+1,Sunday.getDate());
        // block을 나타내기 위해 post로 보내버릴 것
        
        dates[i].innerHTML = Sunday.getDate();
        Sunday.setDate(Sunday.getDate()+1);
        dates[i].style.color ="red";
    }

    if(stdDate.getFullYear() != Sunday.getFullYear()){
        years = stdDate.getFullYear() +","+Sunday.getFullYear();
    }else{
        years = stdDate.getFullYear();
    }
    if(stdDate.getMonth() != Sunday.getMonth() ){
        months = (stdDate.getMonth()+1)+","+(Sunday.getMonth()+1);
    }else{
        months = stdDate.getMonth();
    }

    yearSpan.innerHTML = years;
    monthSpan.innerHTML = months;

}
function setNewToDo(title){

    var newToDoTitle = document.createTextNode(title);
    var newToDoDiv = document.createElement("div");
    newToDoDiv.className += "toDoBlocks";
    newToDoDiv.appendChild(newToDoTitle);
    newToDoDiv.addEventListener("click",function(){
        addBackDiv.style.display="block";
        saveBtn.disabled=true;
        updataBtn.disabled=false;
        submitBtn.disabled=true;
        deleteBtn.disabled=false;
        cancleBtn.disabled=false;
    });
    return newToDoDiv;
}

function showToDoBlocks(){
    $.post("showToDo.php",
    {
        sun : showedDates[0],
        mon : showedDates[1],
        tue : showedDates[2],
        wed : showedDates[3],
        thu : showedDates[4],
        fri : showedDates[5],
        sat : showedDates[6]

    },function(data){
        alert(data);

    });
    for(var i=0; i< showedDates.length; i++){

    }
    console.log(typeof(showedDates));

}

loginBtn.addEventListener("click",function(){
    
    var inputChk = checkInput(inputId.value,inputPw.value);
    if(!inputChk){
        alert("아이디 또는 패스워드가 입력 양식에 맞지 않습니다.");
        joinBackDiv.style.display="none";

    }else{
        $.post("Login.php",
        {
            id : $("#inputId").val(),
            pw : $("#inputPw").val()
        },
        function(data){
            var reData=JSON.parse(data);
            if(reData["toDo"]==0){
                alert("등록된 일정이 없습니다.");
            }
            joinBackDiv.style.display="none";
            loginOK(reData["id"]);
            for(var i=0; i<3; i++){
                table_data[3].appendChild(setNewToDo("something"));
            }
            // showToDoBlocks();
            setPostString(2020,5,3);
        });
    }
});
signInBtn.addEventListener("click",function(){
    var inputChk = checkInput(inputId.value,inputPw.value);
    if(!inputChk){
        alert("아이디 또는 패스워드가 입력 양식에 맞지 않습니다.");
        joinBackDiv.style.display="none";

    }else{
        $.post("SignUp.php",
        {
            id : $("#inputId").val(),
            pw : $("#inputPw").val()
        },
        function(data){
            alert(data);
            joinBackDiv.style.display="none";
        });
    }
});
joinBtn.addEventListener("click",function(){
    joinBackDiv.style.display="block";
});
addBtn.addEventListener("click",function(){
    addBackDiv.style.display="block";
});
saveBtn.addEventListener("click",function(){
    $.post("saveToDo.php",
        {
            date : $("#add_date").val(),
            time : $("#add_time").val(),
            title : $("#add_title").val(),
            description : $("#add_description").val()
        },
        function(data){
            alert("저장되었습니다.");
            addBackDiv.style.display="none";
            returnData = JSON.parse(data);
            
        });
});

