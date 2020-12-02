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
var inputs = document.getElementsByClassName("inputs");
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
//로그인이 되었을 경우 실행되는 함수들.
function loginOK(id){
    addBtn.disabled = false;
    var textID = document.createTextNode(id);
    logined_Id.appendChild(textID);
    var todayDate = new Date();
    checkToday(todayDate);
}
//현재 요일을 받아와서 달력에 표시 될 날짜를 계산한다.
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
// showToDo php로 보낼 데이터를 작성한 뒤 해당 연관배열을 return한다.
function setPostString(year, month, day){
    var returnString;
    var fileNameString;
    var dateString;

    year = year.toString();
    month = month.toString();
    day = day.toString();

    //set month    
    if(month<10){
        month = "0" + month.toString();        
    }
    if(day<10){
        day = "0"+day.toString();
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
    showedDates.length =0; // 화면에 보여지는 Date를 저장하는 배열 초기화
    var stdYear = Sunday.getFullYear();
    var stdMonth = Sunday.getMonth();
    var stdDay = Sunday.getDate();
    

    var months;
    var years;

    for(var i=0; i<7;i++){
        showedDates[i] = setPostString(Sunday.getFullYear(), Sunday.getMonth()+1,Sunday.getDate());

        dates[i].innerHTML = Sunday.getDate();
        Sunday.setDate(Sunday.getDate()+1);
        dates[i].style.color ="red";
    }


    if(stdYear != Sunday.getFullYear()){
        years = stdYear +","+Sunday.getFullYear();
    }else{
        years = stdYear;
    }
    if(stdMonth != Sunday.getMonth() ){
        months = (stdMonth+1)+","+(Sunday.getMonth()+1);
    }else{
        months = stdMonth+1;
        alert(months);
    }

    yearSpan.innerHTML = years;
    monthSpan.innerHTML = months;

    Sunday.setDate(Sunday.getDate()-1);
    
    var minDate = getString(stdYear, dateExtension(stdMonth+1), dateExtension(stdDay));
    var maxDate = getString(Sunday.getFullYear(), dateExtension(Sunday.getMonth()+1),dateExtension(Sunday.getDate()) );

    add_date.setAttribute('min',minDate);
    add_date.setAttribute('max',maxDate);
}

function dateExtension(date){
    if(date<10){
        date = "0"+date;
    }
    return date;
}
function getString(year,month,date){
    return year+"-"+month+"-"+date;
}

//title을 입력 받으면 해당 title을 가진 toDOBlock을 추가한다.
function setNewToDo(title, ID){

    var newToDoTitle = document.createTextNode(title);
    var newToDoDiv = document.createElement("div");
    newToDoDiv.className += "toDoBlocks";
    newToDoDiv.appendChild(newToDoTitle);
    newToDoDiv.id = ID;

    newToDoDiv.addEventListener("click",function(){
        addBackDiv.style.display="block";
        saveBtn.disabled=true;
        updataBtn.disabled=false;
        submitBtn.disabled=true;
        deleteBtn.disabled=false;
        cancleBtn.disabled=false;

        for(var i=0; i<4;i++){
            inputs[i].disabled = false;
        }
    });


    return newToDoDiv;
}

//일정 block을 표시하기 위해서 php에  로그인 시 저장한 날짜 정보를 하나씩 넘긴다.
function showToDoBlocks(){
    $(".table_data").children().remove();
        for(var i =0; i<7; i++){

            $.post("showToDo.php",
            {   
               day : JSON.stringify(showedDates[i]),
               num : i
            },function(data){
                var parsedData = JSON.parse(data);
                if(parsedData["title"] == 1){
                    var arrLength =0;
                    for(x in parsedData){
                        arrLength++;
                    }
                    for(var i=0; i<arrLength-1;i++){
                        var decodedData = JSON.parse(parsedData[i]);

                        var dataTitle = decodedData["title"];
                        var dataNum = decodedData["num"];
                        var dateForID = decodedData["date"]+"/"+dataTitle;
                        var dataBlock = setNewToDo(dataTitle, dateForID);
                        /////////////////////
                        table_data[dataNum].appendChild(dataBlock);
                    }
                }
                
            });
        }
}

//////////////////button events////////////////////////////////////

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

            
            showToDoBlocks();
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
    saveBtn.disabled = false;
    cancleBtn.disabled= false;
    updataBtn.disabled = true;
    submitBtn.disabled=true;
    deleteBtn.disabled =true;
    
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
            console.log(data);
            alert("저장되었습니다.");
            addBackDiv.style.display="none";
            returnData = JSON.parse(data);
            var saveString = returnData["date"]+"/"+returnData["title"];
            showToDoBlocks(saveString);
            
        });
});
updataBtn.addEventListener("click",function(){
    deleteBtn.disabled =true;
    submitBtn.disabled = false;
    updataBtn.disabled = true;
    for(var i=0; i<4;i++){
        inputs[i].disabled = true;
    }

});
cancleBtn.addEventListener("click",function(){
    addBackDiv.style.display="none";

});
submitBtn.addEventListener("click",function(e){
    var getEventId = e.id;
    $.post("update.php",
        {
            date : $("#add_date").val(),
            time : $("#add_time").val(),
            title : $("#add_title").val(),
            description : $("#add_description").val(),
            id : getEventId
        },
        function(data){
            console.log(data);
            // alert("저장되었습니다.");
            // addBackDiv.style.display="none";
            // returnData = JSON.parse(data);
            // var saveString = returnData["date"]+"/"+returnData["title"];
            // showToDoBlocks(saveString);
            
        });
});