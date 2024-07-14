//Function to fetch data from API
async function success(position) {
    let lat = position.coords.latitude; 
    let long = position.coords.longitude;
    let dateset = document.querySelector('.inp').value;
    setTimeout(() => {
    let mapLink = document.querySelector('.mapLink');
    let atag = `<a href= 'https://www.openstreetmap.org/#map=18/${lat}/${long}'>
    Check your location in map</a>`
    mapLink.innerHTML = atag;
    },500);
    let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${dateset}`)
    await response.json()
     .then((data) => {
        let sunriseIST = data.results.sunrise;
        let sunsetIST = data.results.sunset; 
        const [hr,min] = sunriseIST.split(':').map((val) => val = +val);
        const [hr1,min1] = sunsetIST.split(':').map((val) => val = +val);
        let sunrise = document.querySelector('.Sunrise');
        sunrise.innerHTML =  timeConversionRise(hr,min);
        let sunset = document.querySelector('.Sunset');
        sunset.innerHTML = timeConversionSet(hr1,min1);
        const dateFormat = new Date(dateset);
        let risedateFormat = document.querySelector('.riseFormat');
        risedateFormat.innerHTML = dateFormat;
        let setdateFormat = document.querySelector('.setFormat');
        setdateFormat.innerHTML = dateFormat;
       })
       .catch((error) => {
        if(data.status === !ok){
            error.prompt('Error getting data from API')
        }
        });
}
//function to display error message if user denied location access
async function fail(){
    let failMessage = document.querySelector('.failMessage');
    failMessage.innerHTML = 'Unable to retrieve your location... Please allow permission';
    if(!navigator.geolocation){
        failMessage.innerHTML = 'Geolocation is not supported by this browser';
    }
}
//Onclick submit triggers two callback functions
function myFunction(){
navigator.geolocation.getCurrentPosition(success,fail);
}
//Function to convert time zone UST to IST
function timeConversionRise(hr,min){
let istHr = hr + 0o5; 
let istMin = min + 30;
if(istHr <= 12 && istMin <= 60){
    return (`${istHr}:${istMin} AM`);
}else if (istHr > 12 && istMin >= 60){
    let newMin = istMin - 60; 
    let newIst = ((istHr + 1)-(12)); 
    if(newMin < 10){
        newMin = `0${newMin}`;
    }   
    return (`${newIst}:${newMin} AM`);
}else if (istHr < 12 && istMin >= 60){
    let newMin = istMin - 60;
    let newIst = istHr + 1;
    if(newMin < 10){
        newMin = `0${newMin}`;
    }
    return (`${newIst}:${newMin} AM`);
}else if (istHr > 12 && istMin < 60 ) {
    let newIst = istHr - 12;
    return (`${newIst}:${istMin} AM`);
}
}
//Function to convert time zone UST to IST
function timeConversionSet(hr1,min1){
let istHr = hr1 + 0o5;
let istMin = min1 + 30;                          
if(istHr <= 12 && istMin <= 60){
    return (`${istHr}:${istMin} PM`);
}else if (istHr > 12 && istMin >= 60){
    let newMin = istMin - 60;
    let newIst = istHr + 1;
    if(newMin < 10){
        newMin = `0${newMin}`;
    } 
    return (`${newIst}:${newMin} PM`);
}else if (istHr < 12 && istMin >= 60){
    let newMin = istMin - 60;
    let newIst = istHr + 1;
    if(newMin < 10){
        newMin = `0${newMin}`;
    } 
    return (`${newIst}:${newMin} PM`);
}else if (istHr > 12 && istMin < 60 ) {
    let newIst = istHr - 12;
    return (`${newIst}:${istMin} PM`);
}
}