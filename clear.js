const clearBtn=document.querySelector(".clear");
const progBar=document.querySelector("#js-progress");
const list=document.querySelector(".js-toDoList");


function handleClear(){
    localStorage.removeItem("toDos");
    while (list.firstChild){
        list.removeChild(list.firstChild);
    }

    localStorage.removeItem("taskDone");
    localStorage.removeItem("maxToDo");
    progBar.setAttribute('value','0');
    progBar.setAttribute('max','0');

    
}
function init(){
    clearBtn.addEventListener("click",handleClear);
}

init();