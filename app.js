let weartherForm = document.querySelector(".weatherForm");
let cityInput = document.querySelector(".cityInput");
let card = document.querySelector(".card");
let apiKey = "4169f602d0517bc79b3dd740ec72e626";

// This is for by default City 

const defaultCity = "Rourkela";

window.addEventListener("load", async () => {
    try {
        let data = await getWeatherInfo(defaultCity);
        displayWeatherInfo(data);
    } catch (error) {
        printError(error);
    }
});

weartherForm.addEventListener("submit", async function (){
    event.preventDefault();
    let city = cityInput.value;
    cityInput.value="";

    if (city){
        try {
            let data = await getWeatherInfo(city);
            displayWeatherInfo(data);
        }
        catch(error){
            printError(error);
        }

    }else{
        printError("Enter a city");
    }
})

function printError(massage){
    error = document.querySelector(".errorDisplay");
    error.textContent = massage;
}

async function getWeatherInfo(city) {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    let response = await fetch(url);

    if (!response.ok){
        throw new Error ("Could not fetch weather data");
    }else {
        return await response.json();
    }
    
}

function displayWeatherInfo(data){
    console.log(data);

    // Destructuring 
    const { name : city,
            main : { humidity, temp },
            weather : [{description,id}]} = data;

    let temc = temp - 273.15;
    temc = temc.toFixed(2);
    
   let cityName = document.querySelector(".cityDisplay");
   let tempDisplay = document.querySelector(".tempDisplay");
   let humidityDisplay = document.querySelector(".humidityDisplay");
   let desDisplay = document.querySelector(".descDisplay");
   let weatherEmoji = document.querySelector(".weatherEmoji");
   let err = document.querySelector(".errorDisplay");

   tempDisplay.textContent = `${temc}° C`;
   humidityDisplay.textContent = `Humidity : ${humidity}%`;
   desDisplay.textContent = description;
   cityName.textContent = city;
   weatherEmoji.textContent = gateWeatherEmoji(id);
   err.textContent = "";
}


function gateWeatherEmoji (id){
    switch(true){
        case (id >= 200 && id <300):
            return "⛈";
        case (id >= 300 && id <400):
            return "🌧️";
        case (id >= 500 && id <600):
            return "🌧️";
        case (id >= 600 && id <700):
            return "❄️";
        case (id >= 700 && id <800):
            return "🌊";
        case (id === 800):
            return "☀️";
        case (id >= 801 && id <810):
            return "☁️";
        default :
            return "⁉️";   
    }
}