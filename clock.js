const clockContainer=document.querySelector(".js-clock");
const clockTitle=clockContainer.querySelector(".js-title");

function getTime(){
    const date=new Date();
    const minutes=date.getMinutes();
    const hours = date.getHours();
    const seconds=date.getSeconds();
    clockTitle.innerText=`${hours<10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` :seconds}`;  
    // if seconds < 10 put 0 before the sec.
    // else just print the second
}
function init() {
    getTime();
    setInterval(getTime,1000);  // make it (getTime) repeat every 1000ms (1s)
}
 
init();