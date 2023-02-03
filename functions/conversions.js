const convertUnixD = (unix) => {
    let date = new Date(unix * 1000);
    date = date.getDate();
    return date;
}

const convertUnixWDM = (unix) => {
    let date = new Date(unix * 1000);
    date = date.toLocaleDateString("en-BE", {
        weekday: "short",
        month: "short",
        day: "2-digit"
    })
    return date;
}

const convertUnixHM = (unix, timezone) => {
    let time = new Date((unix + timezone - (60*60)) * 1000);
    time = time.toLocaleTimeString("en-BE", {
        hour: "2-digit",
        minute: "2-digit"
    })
    return time;
}

const currentDate = () => {
    let date = new Date()
    date = date.getDate();
    return date;
}

export {convertUnixD, convertUnixHM, convertUnixWDM, currentDate}