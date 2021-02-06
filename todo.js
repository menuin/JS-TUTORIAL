const toDoform=document.querySelector(".js-toDoForm");
const toDoInput=toDoform.querySelector("input");
const toDoList=document.querySelector(".js-toDoList");

const TODOS_LS="toDos";

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
}
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos!==null){
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){   // for each item in parsedToDos
            paintToDo(toDo.text);
        })
    }
    
}
function init(){
    loadToDos();
    toDoform.addEventListener("submit",handleSubmit);
}

init();