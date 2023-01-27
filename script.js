import {key} from "./key.js";
const form = document.querySelector(".searchinput");

const updateCity = async (e) => {
    e.preventDefault();
    form.style.display = "block"
    form.style.height = "100px"
    form.style.margin = "0 auto 5rem auto"
    document.querySelector("body").style.overflowY = "scroll";
    let city = e.target[0].value;
    e.target[0].value = ""
    const apilinkCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + key + "&units=metric"
    let dayOrNight;
    await fetch(apilinkCurrent)
    .then(response => response.json())
    .then(data => {
        const currentTime = data.dt;
        const sunset = data.sys.sunset;
        const sunrise = data.sys.sunrise;
        if (currentTime < sunset && currentTime > sunrise) {
            document.querySelector("body").style.backgroundColor = "#E3EBF2";
            document.querySelector("body").style.color = "#2E3743";
            document.querySelector(".searchinput input").style.background = "linear-gradient(145deg, #ccd4da, #f3fbff)";
            document.querySelector(".searchinput input").style.boxShadow = "9px 9px 33px #c1c8ce, -9px -9px 33px #ffffff";
            document.querySelector(".searchinput input").style.color = "#2E3743";
            document.querySelector(".searchinput button").style.filter = "invert(16%) sepia(8%) saturate(1764%) hue-rotate(175deg) brightness(98%) contrast(85%)"
            dayOrNight = "d";
        } else {
            document.querySelector("body").style.backgroundColor = "#2E3743";
            document.querySelector("body").style.color = "#E3EBF2";
            document.querySelector(".searchinput input").style.background = "linear-gradient(145deg, #29323c, #313b48)";
            document.querySelector(".searchinput input").style.boxShadow = "9px 9px 33px #272f39, -9px -9px 33px #353f4d"
            document.querySelector(".searchinput input").style.color = "#E3EBF2";
            document.querySelector(".searchinput button").style.filter = "invert(99%) sepia(64%) saturate(564%) hue-rotate(173deg) brightness(99%) contrast(92%)"
            dayOrNight = "n";
        }
        const container = document.querySelector(".weather");
        container.style.display = "block"
        const countryEl = document.querySelector(".country");
        const cityEl = document.querySelector(".city");
        cityEl.innerHTML = data.name + ", ";
        countryEl.innerHTML = data.sys.country;
        const timeEl = document.querySelector(".time")
        timeEl.innerHTML = convertUnixWDM(data.dt) + " " + convertUnixHM(data.dt, data.timezone);

        const weathericon = document.querySelector(".weatherinfo img")
        weathericon.src = "./assets/" + data.weather[0].icon + dayOrNight + ".png"
        const temp = document.querySelector(".weatherinfo .temp");
        temp.innerHTML = Math.round(data.main.temp) + "°"
    
        const type = document.querySelector(".weatherinfo .type");
        type.innerHTML = data.weather[0].description;

        
        const winddeg = Math.round(data.wind.deg);
        let windicon = document.querySelector(".windinfo img")
        if (winddeg > 337.5 || winddeg < 22.5) {
            windicon.src = "./assets/wind" + "N" + dayOrNight + ".png"
        } else if (winddeg > 22.5 && winddeg < 67.5) {
            windicon.src = "./assets/wind" + "NE" + dayOrNight + ".png"
        } else if (winddeg > 67.5 && winddeg < 112.5) {
            windicon.src = "./assets/wind" + "E" + dayOrNight + ".png"
        } else if (winddeg > 112.5 && winddeg < 157.5) {
            windicon.src = "./assets/wind" + "SE" + dayOrNight + ".png"
        } else if (winddeg > 157.5 && winddeg < 202.5) {
            windicon.src = "./assets/wind" + "S" + dayOrNight + ".png"
        } else if (winddeg > 202.5 && winddeg < 247.5) {
            windicon.src = "./assets/wind" + "SW" + dayOrNight + ".png"
        } else if (winddeg > 247.5 && winddeg < 292.5) {
            windicon.src = "./assets/wind" + "W" + dayOrNight + ".png"
        } else if (winddeg > 292.5 && winddeg < 337.5) {
            windicon.src = "./assets/wind" + "NW" + dayOrNight + ".png"
        }
        const wind = document.querySelector(".windinfo .wind");
        wind.innerHTML = Math.round(data.wind.speed) + "m/s";

        const humidityicon = document.querySelector(".humidityinfo img");
        humidityicon.src = "./assets/humidity" + dayOrNight + ".png"

        const humidity = document.querySelector(".humidity");
        humidity.innerHTML = data.main.humidity + "%";

        const cloudicon = document.querySelector(".cloudinfo img")
        cloudicon.src = "./assets/04d" + dayOrNight + ".png"

        const cloud = document.querySelector(".clouds")
        cloud.innerHTML = data.clouds.all + "%"
    })

    const apilinkForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=metric"
    await fetch(apilinkForecast)
    .then(response => response.json())
    .then(data => {
        const forecastContainer = document.querySelector(".forecastcontainer");
        while (forecastContainer.lastChild) {
            forecastContainer.removeChild(forecastContainer.lastChild);
        }
        for(let i = 0; i < 12; i++) {
            const forecast = document.createElement("div");
            forecast.classList.add("forecast");

            const timeText = document.createElement("p");
            timeText.classList.add("intervaltime");
            const hour = convertUnixHM(data.list[i].dt, data.city.timezone);
            timeText.innerHTML = hour;
            forecast.append(timeText);

            const forecastimg = document.createElement("img");
            let iconstring = data.list[i].weather[0].icon;
            forecastimg.src = "./assets/" + iconstring + dayOrNight + ".png"
            forecast.append(forecastimg);

            const temps = document.createElement("div");
            temps.classList.add("temps");
            
            const maxtempText = document.createElement("p")
            maxtempText.classList.add("max");
            const mintempText = document.createElement("p")
            mintempText.classList.add("min");
            
            maxtempText.innerHTML = Math.round(data.list[i].main.temp_max) + "°";
            mintempText.innerHTML = Math.round(data.list[i].main.temp_min) + "°";

            temps.append(mintempText, maxtempText);
            forecast.append(temps);
            
            forecastContainer.append(forecast);
        }
        if (forecastContainer.scrollWidth > forecastContainer.clientWidth) {
            forecastContainer.style.boxShadow =  "inset -7px 0 9px -7px rgba(0,0,0,0.7)"
        } else {
            forecastContainer.style.boxShadow = "none"
        }
        let daycontainer = document.querySelector(".forecastdays");
        while (daycontainer.lastChild) {
            daycontainer.removeChild(daycontainer.lastChild);
        }
        for (let interval of data.list) {
            if (currentDate() != convertUnixD(interval.dt)) {
                let localtime = convertUnixHM(interval.dt, data.city.timezone);
                if (localtime == "12:00" || localtime == "13:00" || localtime == "11:00") {
                    let day = document.createElement("div");
                    day.classList.add("day");

                    let date = convertUnixWDM(interval.dt);
                    let dateText = document.createElement("p");
                    dateText.innerHTML = date;

                    let icon = document.createElement("img");
                    let iconsrc = "./assets/" + interval.weather[0].icon + dayOrNight + ".png";
                    icon.src = iconsrc;

                    let temp = document.createElement("p");
                    temp.classList.add("tempday");
                    temp.innerHTML = Math.round(interval.main.temp_min) + "°";

                    day.append(dateText);
                    day.append(icon);
                    day.append(temp)
                    daycontainer.append(day);
                }
            }
        }
        
        while(document.querySelector(".tempgraph").lastChild) {
            document.querySelector(".tempgraph").removeChild(document.querySelector(".tempgraph").lastChild)
        }

        let ctx = document.createElement("canvas");
        document.querySelector(".tempgraph").append(ctx);
        let tempsdataavg = []
        let tempsdatamax = []
        let tempsdatamin = []
        let labels = []
        let todayDate = convertUnixD(data.list[0].dt);
        let tempoTemp = []
        for (let day of data.list) {
            if (todayDate == convertUnixD(day.dt)) {
                tempoTemp.push(day.main.temp);
            } else {
                let avg = avgArray(tempoTemp);
                let max = maxArray(tempoTemp);
                let min = minArray(tempoTemp);
                tempsdataavg.push(avg);
                tempsdatamax.push(max);
                tempsdatamin.push(min);
                labels.push(convertUnixWDM(day.dt));
                tempoTemp = [];
                todayDate = convertUnixD(day.dt);
            }
        }
        let bordercolor;
        let fontcolor;
        if (dayOrNight == "d") {
            bordercolor = "#2E3743";
            fontcolor = "#2E3743";
        } else {
            bordercolor = "#E3EBF2";
            fontcolor = "#E3EBF2";
        }
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Avg temperature',
                    data: tempsdataavg,
                    borderWidth: 1,
                    tension: 0.4
                },
                {
                    label: 'Max temperature',
                    data: tempsdatamax,
                    borderWidth: 1,
                    tension: 0.4,
                    borderColor: "#D22B2B",
                    fill: {
                        above: "rgb(235, 156, 156, 0.2)",
                        target: 0,
                    }
                },
                {
                    label: 'Min temperature',
                    data: tempsdatamin,
                    borderWidth: 1,
                    tension: 0.4,
                    borderColor: "#6495ED",
                    fill: {
                        below: "rgb(100, 149, 237, 0.2)",
                        target: 0,
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                borderColor: bordercolor,
                color: fontcolor,
                elements: {
                    point: {
                        pointStyle: false,
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1,
                            borderColor: bordercolor,
                            color: fontcolor,
                            callback: function(value, index, ticks) {
                                return value + "°";
                            }
                        }
                    },
                    x: {
                        ticks: {
                            borderColor: bordercolor,
                            color: fontcolor,
                        }
                    }
                }
            }
        });
    })
}

const forecastContainer = document.querySelector(".forecastcontainer");
let distanceScrolled = forecastContainer.scrollLeft;

forecastContainer.addEventListener("scroll", (e) => {
    let newDistanceScrolled = forecastContainer.scrollLeft;
    if (newDistanceScrolled > distanceScrolled) {
        forecastContainer.style.boxShadow =  "inset 7px 0 9px -7px rgba(0,0,0,0.7)"; //left
    } else {
        forecastContainer.style.boxShadow =  "inset -7px 0 9px -7px rgba(0,0,0,0.7)"; //right
    }
})

window.addEventListener("resize", (e) => {
    if (forecastContainer.scrollWidth > forecastContainer.clientWidth) {
        forecastContainer.style.boxShadow =  "inset -7px 0 9px -7px rgba(0,0,0,0.7)"
    } else {
        forecastContainer.style.boxShadow = "none"
    }
});

form.addEventListener("submit", updateCity);

function avgArray(array){
    let sum = 0
    for (let i = 0; i < array.length; i += 1) {
    sum += array[i]
    }
    let avg = sum / array.length;
    avg = parseFloat(avg.toFixed(2))
    
    return avg
}

function maxArray(array) {
    let max = Math.max(...array);
    return max;
}

function minArray(array) {
    let min = Math.min(...array);
    return min;
}

function currentDate() {
    let date = new Date()
    date = date.getDate();
    return date;
}

function convertUnixD(unix) {
    let date = new Date(unix * 1000);
    date = date.getDate();
    return date;
}

function convertUnixWDM(unix) {
    let date = new Date(unix * 1000);
    date = date.toLocaleDateString("en-BE", {
        weekday: "short",
        month: "short",
        day: "2-digit"
    })
    return date;
}

function convertUnixHM(unix, timezone) {
    let time = new Date((unix + timezone - (60*60)) * 1000);
    time = time.toLocaleTimeString("en-BE", {
        hour: "2-digit",
        minute: "2-digit"
    })
    return time;
}