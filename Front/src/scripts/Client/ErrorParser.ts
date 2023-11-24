import { dangerAlert } from "../alerts";

export async function parseError(response: any){
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