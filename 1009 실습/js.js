var addBtn = document.getElementById("addBtn");
var contentList = document.getElementById("contentList");

addBtn.addEventListener("click",addText);

function addText(){
    var userInputText = document.getElementById("inputText").value;
    
    var makeList = document.createElement("li");
    var listText = document.createTextNode(userInputText);
    makeList.appendChild(listText);
    makeList.addEventListener("click",modifyContent);
    contentList.appendChild(makeList);

}

function modifyContent(e){
    var modify = prompt("삭제는 1, 수정은 2를 입력하세요.");
    if(modify==1){// 삭제
        e.target.parentNode.removeChild(e.target);

    }else if(modify==2){ //수정
        var newContent = prompt("변경할 내용을 입력하세요.");
        var modifyTextnode = document.createTextNode(newContent);
        
        e.target.removeChild(e.target.childNodes[0]);
        e.target.appendChild(modifyTextnode);


    }else if(modify==0){
        alert("번호를 입력하지 않으셨습니다.");
    }else if(modify==null){
        alert("취소되었습니다.");
    }else{
        alert("번호를 잘못 입력하셨습니다.");

    }
}