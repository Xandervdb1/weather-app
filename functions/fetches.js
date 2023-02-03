import {key} from "../key.js";
const fetchTodaysData = async (e) => {
    const city = e.target[0].value;
    const apilinkCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + key + "&units=metric"
    const response = await fetch(apilinkCurrent);
    const data = await response.json();
    return data;
}

const fetchForecastData = async (e) => {
    const city = e.target[0].value;
    const apilinkForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=metric"
    const response = await fetch(apilinkForecast)
    const data = await response.json();
    return data;
}

export {fetchTodaysData, fetchForecastData};