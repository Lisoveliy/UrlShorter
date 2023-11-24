import { Alert } from "bootstrap";

export function dangerAlert(text?: string, dispose = false) {
    var alertdiv = document.getElementById('alert_fetchfailed');
    alertdiv.style.display = "inline";
    alertdiv.textContent = text ?? "Попробуйте ещё раз";
    if (dispose) {
        setTimeout(() => {
            new Alert(alertdiv).close()
            setTimeout(() => {
            window.location.reload()
            },300);
        }, 1000);
    }
}
export function goodAlert(text?: string) {
    var alertdiv = document.getElementById('alertgood');
    alertdiv.style.display = "inline";
    alertdiv.textContent = text ?? "Успешно!";
    setTimeout(() => {
        new Alert(alertdiv).close()
    }, 1000);
}
