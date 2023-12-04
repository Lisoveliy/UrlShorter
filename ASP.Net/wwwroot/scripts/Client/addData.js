import { dangerAlert } from "../alerts.js";
import { Routes } from "../routes.js";
import { parseError } from "./errorParser.js";
export async function createLink(newurl) {
    if (newurl) {
        var response = await fetch(Routes.createLink, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                realUrl: newurl
            })
        });
        if (response.ok) {
            sessionStorage.setItem("operation", "created");
            sessionStorage.setItem("object", JSON.stringify(await response.json()));
            window.location.href = "/";
        }
        else
            parseError(response);
    }
    else
        dangerAlert("Пустой адрес");
}
