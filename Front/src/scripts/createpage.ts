import '../style.scss'
import '../edit.scss'
import { Routes } from './routes';
import { dangerAlert } from './alerts';

let shorturl = <HTMLInputElement>document.getElementById('shortUrlInput')

document.addEventListener('keypress', async (e)=> {
    if(e.key == "Enter")
    await createLink()
})

document.getElementById('createform').addEventListener('submit',async (e) => {
    e.preventDefault()
    await createLink()
})
async function createLink(){
    if (shorturl.value) {
        var response = await fetch(import.meta.env.VITE_BackEndpoint + Routes.createLink, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                realUrl: shorturl.value
            })
        })
        if(response.ok){
            sessionStorage.setItem("operation", "created")
            sessionStorage.setItem("object", JSON.stringify(await response.json()))
            window.location.href = "/"
        }else{
            let titleresp = (await response.json()).title
            switch(titleresp){
            case "Bad Request":
                dangerAlert("Ошибка со стороны сервера: Ссылка уже существует")
                break;
            case "One or more validation errors occurred.":
                dangerAlert("Ошибка со стороны сервера: можно вводить ссылки только формата http://.* или https://.*")
                break;
            default: dangerAlert("Ошибка со стороны сервера: " + titleresp)
            }
        }
    }else dangerAlert("Пустой адрес")
}