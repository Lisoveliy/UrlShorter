import { Alert } from "bootstrap";

export function dangerAlert(text?: string) {
    var alertdiv = document.getElementById('alert_fetchfailed');
    alertdiv.style.display = "inline";
    alertdiv.textContent = text ?? "Попробуйте ещё раз";
}
export function goodAlert(text?: string) {
    var alertdiv = document.getElementById('alertgood');
    alertdiv.style.display = "inline";
    alertdiv.textContent = text ?? "Успешно!";
    setTimeout(() => {
        new Alert(alertdiv).close()
    }, 1000);
}
