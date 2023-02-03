import {formStyling, scrollboxStyling, changeBoxshadowOnscroll, changeBoxshadowOnresize, removeChildren} from "./functions/styling.js";
import {fetchTodaysData, fetchForecastData} from "./functions/fetches.js"
import dayOrNightCheck from "./functions/dayornightcheck.js";
import {displayData, displayForecastData, displayGraph, displayNextdaysData} from "./functions/displays.js"

const form = document.querySelector(".searchinput");

const updateCity = async (e) => {
    e.preventDefault();
    formStyling(form);
    
    let data = await fetchTodaysData(e);
    let forecastdata = await fetchForecastData(e);
    
    e.target[0].value = ""

    let dayOrNight;
    dayOrNight = dayOrNightCheck(dayOrNight, data);

    displayData(data, dayOrNight);

    const forecastContainer = document.querySelector(".forecastcontainer");
    removeChildren(forecastContainer);
        
    for(let i = 0; i < 12; i++) {
        displayForecastData(i, forecastdata, dayOrNight, forecastContainer);
    }
   
    scrollboxStyling(forecastContainer);
    
    let daycontainer = document.querySelector(".forecastdays");
    removeChildren(daycontainer);
        
    displayNextdaysData(forecastdata, dayOrNight, daycontainer);
        
    const graphcontainer = document.querySelector(".tempgraph")
    removeChildren(graphcontainer);

    displayGraph(forecastdata, dayOrNight);
}

const forecastContainer = document.querySelector(".forecastcontainer");
let distanceScrolled = forecastContainer.scrollLeft;

forecastContainer.addEventListener("scroll", (e) => {
    changeBoxshadowOnscroll(forecastContainer, distanceScrolled);
})

window.addEventListener("resize", (e) => {
    changeBoxshadowOnresize(forecastContainer);
});

form.addEventListener("submit", updateCity);