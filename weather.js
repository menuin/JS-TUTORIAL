
const COORDS ="coords";

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
    saveCoords(coordsObj)
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

    }
}

function init(){
    loadCoords();
}
init();