const toDoform=document.querySelector(".js-toDoForm");
const toDoInput=toDoform.querySelector("input");
const toDoList=document.querySelector(".js-toDoList");
const progressBar=document.querySelector("#js-progress");

const TODOS_LS="toDos";
const DONE_LS="taskDone";
const MAX_LS="maxToDo";

let toDos=[];
let idNum=1;



function deleteToDo(event) {
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);

     // filter among the array(toDos) & make new array(cleanToDos) with the filtered(remaining) items
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);  // filter those items whose toDo.id !== li.id (those deleted from the list)
    }); 
    toDos=cleanToDos;
    saveToDos();


    /* -------------------progress bar */

    const taskDone=Number(localStorage.getItem(DONE_LS));
    localStorage.setItem(DONE_LS,taskDone+1);
    progressBar.setAttribute('value',taskDone+1);


    
}
function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}
function paintToDo(text){
    const li=document.createElement("li");
    const delBtn=document.createElement("button");
    delBtn.innerText="❌"
    delBtn.addEventListener("click",deleteToDo);
    const span=document.createElement("span");
    const newId=idNum;
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    
    li.id=newId;
    toDoList.appendChild(li);

    const toDoObj={
        text:text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos();

    idNum+=1;


    


}
function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";

    /* -----------------------progress bar */
    const numOfToDos=document.querySelectorAll(".js-toDoList li").length;
    let maxProgress=Math.max(numOfToDos,Number(localStorage.getItem(MAX_LS)));
    if (numOfToDos<Number(localStorage.getItem(MAX_LS))){
        progressBar.setAttribute('max',maxProgress+1);
        localStorage.setItem(MAX_LS,maxProgress+1);
    }
    else {
        progressBar.setAttribute('max',maxProgress);
        localStorage.setItem(MAX_LS,maxProgress);
    }
   



}
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos!==null){
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){   // for each item in parsedToDos
            paintToDo(toDo.text);
        })
    }
    
    /* -----------------------progress bar */
    progressBar.setAttribute('max',Number(localStorage.getItem(MAX_LS)));
    progressBar.setAttribute('value',Number(localStorage.getItem(DONE_LS)));

}
function init(){
    loadToDos();
    toDoform.addEventListener("submit",handleSubmit);
}

init();