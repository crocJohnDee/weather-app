import { drawCanvas } from "./canvas.js"

const link = "https://api.openweathermap.org/data/2.5/forecast?";
const key = "&appid=ae53c21b63f82791dcb65846a1306930";

const city = document.querySelector("#city");
const country = document.querySelector("#country");
const celcius = document.querySelector("#c");
const fahrenheit = document.querySelector("#f");
const icon = document.querySelector("#icon");
const humidity = document.querySelector("#hum");
const discription = document.querySelector("#discr");
const wind = document.querySelector("#wind");

const days = document.querySelectorAll(".day");
const max = document.querySelectorAll(".tempMax");
const min = document.querySelectorAll(".tempMin");
const fOrC = document.querySelectorAll(".fOrC");

const error = document.querySelector("#error");

let checkbox = document.querySelector("[type='checkbox']");
let fullLink;

export function swap() {

    fOrC.forEach(x => checkbox.checked ? x.textContent = "F" : x.textContent = "C");

    max.forEach(x =>
        checkbox.checked
            ? x.textContent = (parseFloat(x.textContent * 1.8) + 32).toFixed(0)
            : x.textContent = (parseFloat(x.textContent - 32) / 1.8).toFixed(0)
    )

    min.forEach(x =>
        checkbox.checked
            ? x.textContent = (parseFloat(x.textContent * 1.8) + 32).toFixed(0)
            : x.textContent = (parseFloat(x.textContent - 32) / 1.8).toFixed(0)
    )

    checkbox.checked
        ? wind.textContent = `${(parseFloat(wind.textContent) * 2.23694).toFixed(2)} Miles/hour`
        : wind.textContent = `${(parseFloat(wind.textContent) / 2.23694).toFixed(2)} Meterc/sec`
}

export function getPosition() {

    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        fullLink = `${link}lat=${lat}&lon=${long}${key}&units=metric`;
        fetch(fullLink)
            .then((response) => response.json())
            .then((myJson) => {
                write(myJson);
            });
    });
}

export function setData(e) {
    e.preventDefault();
    fullLink = `${link}q=${e.target[0].value}${key}&units=metric`
    fetch(fullLink)
        .then((response) => response.json())
        .then((myJson) => {
            error.textContent = ""
            write(myJson)
        }).catch(() =>


            error.textContent = `${e.target[0].value} is not a city`
        );;
}

function write(myJson) {
    const dayTime = myJson.list.filter((x, i) => x.dt_txt.split(" ")[1] === "15:00:00" || i === 0);
    const nightTime = myJson.list.filter((x, i) => x.dt_txt.split(" ")[1] === "03:00:00");
    dayTime.length === 6 ? dayTime.shift() : null;
    for (let i = 0; i < 5; i++) {
        const day = dayTime[i].dt_txt.split(" ")[0].split("-")[2];
        const month = dayTime[i].dt_txt.split(" ")[0].split("-")[1]
        days[i].textContent = `${day}/${month}`;
        checkbox.checked
            ? max[i].textContent = (parseFloat(dayTime[i].main.temp_max * 1.8) + 32).toFixed(0)
            : max[i].textContent = parseFloat(dayTime[i].main.temp_max).toFixed(0);
        checkbox.checked
            ? min[i].textContent = (parseFloat(nightTime[i].main.temp_max * 1.8) + 32).toFixed(0)
            : min[i].textContent = parseFloat(nightTime[i].main.temp_max).toFixed(0);
    }

    checkbox.checked
        ? wind.textContent = `${(myJson.list[0].wind.speed * 2.23694).toFixed(2)} Miles/hour`
        : wind.textContent = `${myJson.list[0].wind.speed} Meterc/sec`;

    celcius.textContent = parseFloat(dayTime[0].main.temp_max).toFixed(0);
    fahrenheit.textContent = (parseFloat(dayTime[0].main.temp_max * 1.8) + 32).toFixed(0)
    humidity.textContent = myJson.list[0].main.humidity;
    discription.textContent = myJson.list[0].weather[0].description;
    city.textContent = myJson.city.name.split(" ")[0];
    country.textContent = myJson.city.country;
    icon.src = `http://openweathermap.org/img/wn/${myJson.list[0].weather[0].icon}@2x.png`;
    drawCanvas(myJson);
}