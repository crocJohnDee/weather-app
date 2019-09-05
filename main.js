import { setDate } from "./date.js"
import { setData, getPosition, swap } from "./data.js";
const form = document.querySelector("form");
const now = document.querySelector("#now");
const unit = document.querySelector(".switch-wrap");


getPosition();
now.textContent = setDate();
setInterval(function () { now.textContent = setDate(); }, 1000);

unit.addEventListener("change", () => swap());

form.addEventListener("submit", (e) => setData(e));



