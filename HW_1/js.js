//variables

var addProduct = document.getElementById("icon");
var Modal = document.getElementById("modalBack");
var orgDeliverBody = document.getElementById("orgTbody");
var dawnDeliverBody = document.getElementById("dawnTbody");
let checkedList_O = new Array();
let checkedList_D = new Array();
let checkSearched = new Array();

//addEvent
document.getElementById("addBtn").addEventListener("click",addPro);
document.getElementById("org_allChoose").addEventListener("click",allChecked_O);
document.getElementById("dawn_allChoose").addEventListener("click",allChecked_D);
document.getElementById("org_deleteBtn").addEventListener("click",deleteRow_O);
document.getElementById("dawn_deleteBtn").addEventListener("click",deleteRow_D);
document.getElementById("addCancleBtn").addEventListener("click",function(){
    Modal.style.display="none";
});
document.getElementById("moveToDawn").addEventListener("click",O_moveTo_D);
document.getElementById("moveToOrg").addEventListener("click",D_moveTo_O);
document.getElementById("searchBtn").addEventListener("click",search);
document.getElementById("resetColor").addEventListener("click",resetAll);


addProduct.addEventListener("click",function(){
Modal.style.display="block";
});

function allChecked_O(){
    
    let O_allCheckBtn = document.getElementById("org_allChoose");
    let O_checkBoxes = document.getElementsByClassName("O_Check");
    
    if(O_allCheckBtn.checked==true){
        for(let i=0;i<O_checkBoxes.length;i++){
            O_checkBoxes[i].checked=true;
        }
    }else{
        for(let i=0;i<O_checkBoxes.length;i++){
            O_checkBoxes[i].checked=false;
        }
    }
    IsChecked_O();
    
} 
function allChecked_D(){
    let D_allCheckBtn = document.getElementById("dawn_allChoose");
    let D_checkBoxes = document.getElementsByClassName("D_Check");
    if(D_allCheckBtn.checked==true){
        for(let i=0;i<D_checkBoxes.length;i++){
            D_checkBoxes[i].checked=true;
        }
    }else{
        for(let i=0;i<D_checkBoxes.length;i++){
            D_checkBoxes[i].checked=false;
        }
    }
    IsChecked_D();
}
window.onload=function(){
    var o_total_price = document.getElementById("org_total_price");
    var d_total_price = document.getElementById("dawn_total_price");
    var zero = document.createTextNode("0");
    var zero_2 = document.createTextNode("0");
    o_total_price.appendChild(zero);
    d_total_price.appendChild(zero_2);
}
function addPro(){
    var proImg = document.getElementById("proImg");
    var proName = document.getElementById("proName").value;
    var proPrice = document.getElementById("proPrice").value;
    var proNum = document.getElementById("proNum").value;
    var howToDel= document.getElementsByClassName("del");

    var checkObject =checkPro(proImg.value, proName, proPrice, proNum, howToDel);
    
    if(checkObject==1){ 
        if(howToDel[0].checked==true){

            let row =orgDeliverBody.insertRow(-1);
            row.className +="O_rows";
            
            let cell1 =row.insertCell(0);
            let cell2 =row.insertCell(1);
            let cell3 =row.insertCell(2);
            let cell4 =row.insertCell(3);
            let cell5 =row.insertCell(4);
            let cell6 =row.insertCell(5);
            cell6.className+= "O_proSum_price";
            let checkbox = document.createElement("input");

            checkbox.type="checkbox";
            checkbox.className+="O_Check";
            checkbox.checked =true;
            checkbox.addEventListener("click",IsChecked_O);

            var fileAdress = proImg.value.substring(12,proImg.length);
            let product_img = document.createElement("img");

            product_img.src = "./"+fileAdress; 
            product_img.className+="O_IMG"; 
 
            let product_name = document.createTextNode(proName);
            let product_price = document.createTextNode(proPrice);
            let product_num = document.createTextNode(proNum);
            let product_Sum = document.createTextNode(proPrice*proNum);


            cell1.appendChild(checkbox);
            cell2.appendChild(product_img);
            cell3.appendChild(product_name);
            cell4.appendChild(product_price);
            cell5.appendChild(product_num);
            cell6.appendChild(product_Sum);


            IsChecked_O();
            
        }else{
            let row =dawnDeliverBody.insertRow(-1); // 가장 마지막 row에 추가
            row.className +="D_rows";
            
            let cell1 =row.insertCell(0);
            let cell2 =row.insertCell(1);
            let cell3 =row.insertCell(2);
            let cell4 =row.insertCell(3);
            let cell5 =row.insertCell(4);
            let cell6 =row.insertCell(5);
            cell6.className+= "D_proSum_price";
            let checkbox = document.createElement("input");

            checkbox.type="checkbox";
            checkbox.className+="D_Check";
            checkbox.checked =true;
            checkbox.addEventListener("click",IsChecked_D);

            var fileAdress = proImg.value.substring(12,proImg.length);
            let product_img = document.createElement("img");

            product_img.src = "./"+fileAdress; 
            product_img.className+="D_IMG"; //css 이미지 크기 조절용 클래스 설정
 
            let product_name = document.createTextNode(proName);
            let product_price = document.createTextNode(proPrice);
            let product_num = document.createTextNode(proNum);
            let product_Sum = document.createTextNode(proPrice*proNum);


            cell1.appendChild(checkbox);
            cell2.appendChild(product_img);
            cell3.appendChild(product_name);
            cell4.appendChild(product_price);
            cell5.appendChild(product_num);
            cell6.appendChild(product_Sum);
        
            IsChecked_D();
        }

    }
    
} 
function checkPro(proImg, proName, proPrice, proNum, howToDel){ 
    
    var checkFileIndex=proImg.lastIndexOf(".");
    var fileForm = proImg.substring(checkFileIndex+1,proImg.length).toLowerCase();
    
    var checkInput =0;

    // 1. 이미지 Validator
    if(proImg==''){
        alert("상품 이미지를 추가하시오.");
        checkInput++;
    }else{
        if(!(fileForm =="jpg"||fileForm=="png"||fileForm=="jpeg")){
            alert("이미지 파일이 아닙니다.'jpg','jpeg','png'를 확장자로 가진 파일을 추가하시오.");
            checkInput++;
        }
    }

    //2. 상품 이름 validator
    if(proName==''){
        alert("상품 이름을 입력하시오.");
        checkInput++;
    }else{
        if(!isNaN(proName)){
            alert("문자로 된 상품 이름을 입력하시오.");
            checkInput++;
        }
    }

    //3. 상품 가격 validator
    if(proPrice==''){
        alert("상품 가격을 입력하시오.");
        checkInput++;
    }else{
        if(isNaN(proPrice)){
            alert("상품 가격에 숫자를 입력하시오.");
            checkInput++;
        }else if(proPrice<1000){
            alert("상품 가격을 1000원 이상으로 입력하시오.");
            checkInput++;
        }
    }

    //4. 상품 개수 validation
    
    if(proNum==''){
        alert("상품 개수를 입력하시오.");
        checkInput++;
    }else if(proNum==0 || proNum>50){
        alert("최대 50개 이하로 선택하시오");
        checkInput++;
    }

    //5.배송 방법 validation
    
    if(howToDel[0].checked==false && howToDel[1].checked==false){
        alert("배송 방법을 선택하시오.");
        checkInput++;
    }


    if(checkInput>0){
        return 0;
    }else{
        return 1;
    }
} 
function IsChecked_O(){
    let org_checked = document.getElementsByClassName("O_Check"); // 체크 여부
    let org_priceSum = document.getElementsByClassName("O_proSum_price"); // 가격
    let org_checked_price=0; // 체크한 총 가격
    let O_sum = document.getElementById("org_total_price"); // 가격 표시
    let O_allCheck =0;
    let O_allCheck_Btn = document.getElementById("org_allChoose");
    let arr = new Array();


    for(let i=0;i<org_checked.length;i++){
        if(org_checked[i].checked == true){
            arr.push(i);
            org_checked_price = parseInt(org_checked_price) + parseInt(org_priceSum[i].innerHTML);
            O_allCheck++;
        }
    }
    checkedList_O =arr;
    if(org_checked.length==0){
        O_allCheck_Btn.checked=false;
    }
    else if( O_allCheck==org_checked.length){
        O_allCheck_Btn.checked=true;
    }else{
        O_allCheck_Btn.checked=false;
    }
    let O_price = document.createTextNode(org_checked_price);
    O_sum.removeChild(O_sum.childNodes[0]);
    O_sum.appendChild(O_price);
} 
function IsChecked_D(){
    
    let dawn_checked = document.getElementsByClassName("D_Check"); // 체크 여부
    let dawn_priceSum = document.getElementsByClassName("D_proSum_price"); // 가격
    let dawn_checked_price=0; // 체크한 총 가격
    let D_sum = document.getElementById("dawn_total_price"); // 가격 표시
    let D_allCheck =0;
    let D_allCheck_Btn = document.getElementById("dawn_allChoose");
    let arr = new Array();

    for(let i=0;i<dawn_checked.length;i++){
        if(dawn_checked[i].checked == true){
            arr.push(i);
            dawn_checked_price = parseInt(dawn_checked_price) + parseInt(dawn_priceSum[i].innerHTML);
            D_allCheck++;
        }
    }
    checkedList_D =arr;


    if(dawn_checked.length==0){
        D_allCheck_Btn.checked=false;
    }else if(dawn_checked.length==D_allCheck){
        D_allCheck_Btn.checked=true;
    }else{
        D_allCheck_Btn.checked=false;
    }
    let D_price = document.createTextNode(dawn_checked_price);
    D_sum.removeChild(D_sum.childNodes[0]);
    D_sum.appendChild(D_price);
    

} 
function deleteRow_O(){
    let Org_rows = document.getElementsByClassName("O_rows");
    let aCheckBtn = document.getElementById("org_allChoose");
    
    for(let i=checkedList_O.length;i>0;i--){
        let num = checkedList_O[i-1];
        Org_rows[num].parentNode.removeChild(Org_rows[num]);
    }
    IsChecked_O();
    aCheckBtn.checked=false;

} 
function deleteRow_D(){
    let dawn_rows = document.getElementsByClassName("D_rows");
    let aCheckBtn = document.getElementById("dawn_allChoose");

    for(let i=checkedList_D.length;i>0;i--){
        let num = checkedList_D[i-1];
        dawn_rows[num].parentNode.removeChild(dawn_rows[num]);
    }
    IsChecked_D();
    aCheckBtn.checked=false;

} 
function O_moveTo_D(){
    let Org_rows = document.getElementsByClassName("O_rows");
    let arr = new Array();

    for(let i=checkedList_O.length;i>0;i--){
        let checkedNum = checkedList_O[i-1];
               let newRow = Org_rows[checkedNum];
        arr.push(newRow);
    }
    for(let i=arr.length;i>0;i--){
        arr[i-1].className="D_rows"
        arr[i-1].childNodes[0].childNodes[0].className="D_Check";
        arr[i-1].childNodes[0].childNodes[0].removeEventListener("click",IsChecked_O);
        arr[i-1].childNodes[0].childNodes[0].addEventListener("click",IsChecked_D);
        arr[i-1].childNodes[1].childNodes[0].className="D_IMG";
        arr[i-1].childNodes[5].className="D_proSum_price";

        dawnDeliverBody.appendChild(arr[i-1]);
    }
    IsChecked_D();
    IsChecked_O();
             
} 
function D_moveTo_O(){
    let dawn_rows = document.getElementsByClassName("D_rows");
    let arr = new Array();

    for(let i=checkedList_D.length;i>0;i--){
        let checkedNum = checkedList_D[i-1];
               let newRow = dawn_rows[checkedNum];
        arr.push(newRow);
    }
    for(let i=arr.length;i>0;i--){
        arr[i-1].className="O_rows"
        arr[i-1].childNodes[0].childNodes[0].className="O_Check";
        arr[i-1].childNodes[0].childNodes[0].removeEventListener("click",IsChecked_D);
        arr[i-1].childNodes[0].childNodes[0].addEventListener("click",IsChecked_O);
        arr[i-1].childNodes[1].childNodes[0].className="O_IMG";
        arr[i-1].childNodes[5].className="O_proSum_price";

        orgDeliverBody.appendChild(arr[i-1]);
    }
    
    IsChecked_O();
    IsChecked_D();
    
} 
function search(){
    let searchText = document.getElementById("searchByText").value.toString();
    let row_o = document.getElementsByClassName("O_rows");
    let row_d = document.getElementsByClassName("D_rows");
    let min = parseInt(document.getElementById("min").value);
    let max =parseInt(document.getElementById("max").value);
    
    for(let i=0; i< row_o.length;i++){
        reset(row_o[i]);
    }
    for(let i=0;i<row_d.length;i++){
        reset(row_d[i]);
    }
    if(searchText!="" ){ 
        for(let i=0;i<row_o.length;i++){
            let productName = row_o[i].childNodes[2].childNodes[0].nodeValue;
            let cost = parseInt(row_o[i].childNodes[3].innerHTML);
            
            if(productName.indexOf(searchText)!=-1){ 
                var checkCost = costCheck(row_o[i],min,max,cost);
                if(checkCost ==1){ 
                    found(row_o[i]); 
                }
            }
        }
        for(let i=0;i<row_d.length;i++){
            let productName = row_d[i].childNodes[2].childNodes[0].nodeValue;
            let cost = parseInt(row_d[i].childNodes[3].innerHTML);
            
            if(productName.indexOf(searchText)!=-1){ 
                var checkCost = costCheck(row_d[i],min,max,cost);
                if(checkCost ==1){ 
                    found(row_d[i]); 
                }
            }
        }
    }else{
        for(let i=0;i<row_o.length;i++){
            let cost = parseInt(row_o[i].childNodes[3].innerHTML);
            costCheck(row_o[i],min,max,cost);
        }
        for(let i=0;i<row_d.length;i++){
            let cost = parseInt(row_d[i].childNodes[3].innerHTML);
            costCheck(row_d[i],min,max,cost);
        }
    }

}
function found(row){
    for(let i=2; i<=5;i++){
        row.childNodes[i].style.fontSize = "20px";
        row.childNodes[i].style.color = "red";
        row.childNodes[i].style.fontWeight = "600";
    }
}
function reset(row){
    for(let i=2; i<=5;i++){
        row.childNodes[i].style.fontSize ="";
        row.childNodes[i].style.color ="black";
        row.childNodes[i].style.fontWeight ="";
    }
    
}
function resetAll(){
    let row_o = document.getElementsByClassName("O_rows");
    let row_d = document.getElementsByClassName("D_rows");

    for(let i=0;i<row_o.length;i++){
        reset(row_o[i]);
    }
    for(let i=0;i<row_d.length;i++){
        reset(row_d[i]);
    }
}
function costCheck(R,min,max,cost){
    if(!isNaN(min) && isNaN(max)){
        if(cost>=min){
            found(R);
        }
    }else if(isNaN(min) && !isNaN(max)){
        if(cost<=max){
            found(R);
        }
    }else if(!isNaN(min) && !isNaN(max)){
        if(cost>=min && cost<=max){
            found(R);
        }
    }else{ // 값 입력값이 없음.
        return 1;
    }
}