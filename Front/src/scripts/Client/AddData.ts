import { dangerAlert } from "../alerts"
import { Routes } from "../routes"
import { parseError } from "./ErrorParser"

export async function createLink(newurl: string) {
    if (newurl) {
        var response = await fetch(import.meta.env.VITE_BackEndpoint + Routes.createLink, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                realUrl: newurl
            })
        })
        if (response.ok) {
            sessionStorage.setItem("operation", "created")
            sessionStorage.setItem("object", JSON.stringify(await response.json()))
            window.location.href = "/"
        } else parseError(response)
    } else dangerAlert("Пустой адрес")
}
