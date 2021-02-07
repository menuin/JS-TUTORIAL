const form = document.querySelector(".js-form");
const toDoForm=document.querySelector(".js-toDoForm");
const input=form.querySelector("input");
const greeting=document.querySelector(".js-greetings")
const USER_LS="currentUser";
const SHOWING_CN="showing";

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);

    const date=new Date();
    const hour=date.getHours();

    if (hour >=5 && hour <=11) {
        greeting.innerText=`good morning,  ${text}`;
    }
    else if (hour>=12 && hour <=17){
        greeting.innerText=`good afternoon,  ${text}`;
    }
    else if (hour>=18 && hour <=23){
        greeting.innerText=`good evening,  ${text}`;
    }
    else {
        greeting.innerText=`hello,  ${text}`;
    }
    
}

function saveName(text){
    localStorage.setItem(USER_LS,text);
}
function handleSubmit(){
    event.preventDefault();    // prevent the default behavior (name vanishes) when push submit
    const currentValue=input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
    toDoForm.classList.add(SHOWING_CN);
}
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function loadName(){
    const currentUser=localStorage.getItem(USER_LS);
    if (currentUser===null){ // there ISN'T a user
        askForName();
    }
    else{  // there IS a user
        paintGreeting(currentUser);
        toDoForm.classList.add(SHOWING_CN);
        
    }
}

function init(){
    loadName();
}

init();