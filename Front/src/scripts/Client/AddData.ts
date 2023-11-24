import { dangerAlert } from "../alerts"
import { Routes } from "../routes"

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
        } else {
            //Read response from server
            let titleresp = (await response.json()).title
            switch (titleresp) {
                case "Bad Request":
                    dangerAlert("Ошибка со стороны сервера: Ссылка уже существует")
                    break;
                case "One or more validation errors occurred.":
                    dangerAlert("Ошибка со стороны сервера: можно вводить ссылки только формата http://.* или https://.*")
                    break;
                default: dangerAlert("Ошибка со стороны сервера: " + titleresp)
            }
        }
    } else dangerAlert("Пустой адрес")
}
