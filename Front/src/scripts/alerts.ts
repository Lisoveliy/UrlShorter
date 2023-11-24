import { Alert } from "bootstrap";

export function dangerAlert(text?: string, dispose = false, time = 1500) {
    var alertdiv = document.getElementById('alert_fetchfailed');
    alertdiv.style.display = "inline";
    alertdiv.textContent = text ?? "Попробуйте ещё раз";
    if (dispose) {
        setTimeout(() => {
            new Alert(alertdiv).close()
            setTimeout(() => {
            window.location.reload()
            },300);
        }, time);
    }
}
export function goodAlert(text?: string, time = 1500) {
    var alertdiv = document.getElementById('alertgood');
    alertdiv.style.display = "inline";
    alertdiv.innerHTML = text ?? "Успешно!";
    setTimeout(() => {
        new Alert(alertdiv).close()
    }, time);
}
