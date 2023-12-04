import * as bootstrap from "./bootstrap.bundle.min.js";
//Init error alert
export function dangerAlert(text, dispose = false, time = 1500) {
    var alertdiv = document.getElementById('alert_fetchfailed');
    alertdiv.style.display = "inline";
    alertdiv.textContent = text ?? "Попробуйте ещё раз";
    if (dispose) {
        setTimeout(() => {
            new Alert(alertdiv).close();
            setTimeout(() => {
                window.location.reload();
            }, 300);
        }, time);
    }
}
//Init notification alert
export function goodAlert(text, time = 1500) {
    var alertdiv = document.getElementById('alertgood');
    alertdiv.style.display = "inline";
    alertdiv.innerHTML = text ?? "Успешно!";
    setTimeout(() => {
        new bootstrap.Alert(alertdiv).close();
    }, time);
}
