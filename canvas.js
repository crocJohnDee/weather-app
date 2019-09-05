
let max = document.querySelectorAll(".tempMax");
let min = document.querySelectorAll(".tempMin");


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
console.dir(canvas);



export function drawCanvas(myJson) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(myJson);
    let day = myJson.list.filter((x) =>
        x.dt_txt.split(" ")[1] === "09:00:00"
        || x.dt_txt.split(" ")[1] === "12:00:00"
        || x.dt_txt.split(" ")[1] === "15:00:00"
        || x.dt_txt.split(" ")[1] === "18:00:00"

    )
    let night = myJson.list.filter((x) =>
        x.dt_txt.split(" ")[1] === "21:00:00"
        || x.dt_txt.split(" ")[1] === "00:00:00"
        || x.dt_txt.split(" ")[1] === "03:00:00"
        || x.dt_txt.split(" ")[1] === "06:00:00"
    )
    console.log(night);

    let max2 = day.map(x => x = parseInt((x.main.temp).toFixed(0)));
    let min2 = night.map(x => x = parseInt((x.main.temp).toFixed(0)));
    console.log(max2);
    function drawDay() {
        let dayCounter = 0;
        for (let i = 0; i < max2.length; i++) {
            ctx.beginPath();

            ctx.strokeStyle = "red"
            ctx.moveTo(dayCounter, canvas.clientHeight - (max2[i] * 7) + 20);
            dayCounter += canvas.scrollWidth / 29;
            ctx.lineTo(dayCounter, canvas.clientHeight - (max2[i + 1 || i] * 7) + 20);


            ctx.stroke();
        }
    }
    drawDay();

    function drawNight() {
        let nightCounter = 0;
        for (let i = 0; i < min2.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = "#00d8ff"
            ctx.moveTo(nightCounter, canvas.clientHeight - (min2[i] * 7) + 30);
            nightCounter += canvas.clientWidth / 29;
            ctx.lineTo(nightCounter, canvas.clientHeight - (min2[i + 1 || i] * 7) + 30);
            ctx.stroke();
        }
    }
    drawNight();


}

