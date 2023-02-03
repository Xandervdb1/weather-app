const formStyling = (form) => {
    form.style.display = "block"
    form.style.height = "100px"
    form.style.margin = "0 auto 5rem auto"
    document.querySelector("body").style.overflowY = "scroll";
}

const scrollboxStyling = (forecastContainer) => {
    if (forecastContainer.scrollWidth > forecastContainer.clientWidth) {
        forecastContainer.style.boxShadow =  "inset -7px 0 9px -7px rgba(0,0,0,0.7)"
    } else {
        forecastContainer.style.boxShadow = "none"
    }
}

const changeBoxshadowOnscroll = (forecastContainer, distanceScrolled) => {
    let newDistanceScrolled = forecastContainer.scrollLeft;
    if (newDistanceScrolled > distanceScrolled) {
        forecastContainer.style.boxShadow =  "inset 7px 0 9px -7px rgba(0,0,0,0.7)"; //left
    } else {
        forecastContainer.style.boxShadow =  "inset -7px 0 9px -7px rgba(0,0,0,0.7)"; //right
    }
}

const changeBoxshadowOnresize = (forecastContainer) => {
    if (forecastContainer.scrollWidth > forecastContainer.clientWidth) {
        forecastContainer.style.boxShadow =  "inset -7px 0 9px -7px rgba(0,0,0,0.7)"
    } else {
        forecastContainer.style.boxShadow = "none"
    }
}

const removeChildren = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

export {formStyling, scrollboxStyling, changeBoxshadowOnscroll, changeBoxshadowOnresize, removeChildren}