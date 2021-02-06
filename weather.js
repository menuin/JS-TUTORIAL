const weather=document.querySelector(".js-weather");
const API_KEY ="3e04b18f88579f170d13a7a0c2381705";
const COORDS ="coords";

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then (function(response){  // wait until data is fetched
        return response.json();
    }).then (function(json){ // wait until json is ready
        const temperature=Math.floor(json.main.temp);
        const place=json.name;
        weather.innerText=`${temperature} °C @ ${place}   `;
    })

} 


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log("Can't access geo location");
}
function askForCoords(){   // how to get your location
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}
function loadCoords(){
    const loadedCords=localStorage.getItem(COORDS);
    if (loadedCords === null){
        askForCoords();
    }
    else{
        const parsedCoords=JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();