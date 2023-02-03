const dayOrNightCheck = (dayOrNight, data) => {
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
    return dayOrNight;
}

export default dayOrNightCheck;