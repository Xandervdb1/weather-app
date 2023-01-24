let form = document.querySelector(".searchinput")

let updateCity = (e) => {
    e.preventDefault();
    let key = ""
    let city = e.target[0].value;
    
    let apilink = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + key + "&units=metric"

    fetch(apilink)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let countryEl = document.querySelector(".country");
        let cityEl = document.querySelector(".city");
        cityEl.innerHTML = data.name + ", ";
        countryEl.innerHTML = data.sys.country;

        let temp = document.querySelector(".weatherinfo .temp");
        temp.innerHTML = Math.round(data.main.temp) + "°C (" + Math.round(data.main.feels_like) + "°C)";
    
        let type = document.querySelector(".weatherinfo .type");
        type.innerHTML = data.weather[0].description;

        let wind = document.querySelector(".windinfo .wind");
        wind.innerHTML = data.wind.speed + "m/s";
    })
}

form.addEventListener("submit", updateCity);