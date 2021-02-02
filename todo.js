const toDoform=document.querySelector(".js-toDoForm");
const toDoInput=toDoform.querySelector("input");
const toDoList=document.querySelector(".js-toDoList");

const TODOS_LS="toDos";

let toDos=[];


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
    
    // list에서 item을 삭제하면 남은 item들의 id가 자동으로 바뀌는데 왜인지 모르겠음!~
    // 1234에서 id=3이 빠지면 남은 것들의 id가 124가 되는게 아니라 123으로 바뀜
    // => 자동으로 안바뀜~~ 안바뀌는게 맞음!
    // 해결 )
    // let idNum=1;
    /* function paintToDo(text){ 에서
        const newId=idNum;
        idNum+=1;
    } */
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
    const newId=toDos.length+1;
    span.innerText=text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id=newId;
    toDoList.appendChild(li);

    const toDoObj={
        text:text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos();
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