export function setDate() {
    const day = new Date().getDay();
    const days = ["Sunday", "Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saterday"]
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();

    return `${days[day]} ${hour}:${minutes}`;
}




