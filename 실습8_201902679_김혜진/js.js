var start_btn = document.getElementById("start_btn");
var timerCount = document.getElementById("timerCount");
var addimg = document.getElementById("addimg");
var fileChoose = document.getElementById("fileChoose");
var Imgs = document.getElementById("Imgs");
var bk_A = document.getElementById("bk_A");
var bk_B = document.getElementById("bk_B");

var w;

start_btn.addEventListener("click",startWorker);
addimg.addEventListener("click",addImg);

function startWorker(){
    start_btn.disabled = true;
    addimg.disabled = false;

    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
          w = new Worker("timer.js");
        }
        w.onmessage = function(event) {
            timerCount.innerHTML = event.data;
          if(event.data ==40){
              stopWorker();
              alert("A 장바구니 : "+sessionStorage.getItem('bk_A')
              +" B 장바구니 : "+ sessionStorage.getItem('bk_B'));
              start_btn.disabled = false;
          }
        };
      }
}
function stopWorker() { 
    start_btn.disabled = false;
    w.terminate();
    w = undefined;
}

function addImg(){
    let creatImg = document.createElement("img");
    var imgSrc = fileChoose.value.substring(12,fileChoose.length);
    creatImg.src = "./"+imgSrc;
    creatImg.width =100;
    creatImg.draggable="true";
    creatImg.setAttribute('ondragstart',"drag(event)");
    creatImg.setAttribute('id',imgSrc);
    Imgs.appendChild(creatImg);
}

function allowDrop(ev){
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    if (typeof(Storage) !== "undefined") {
      // Store
      sessionStorage.setItem(bk_A.id, bk_A.childElementCount);
      sessionStorage.setItem(bk_B.id, bk_B.childElementCount);
    } 
  }
