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
            dangerAlert("Ссылка уже существует", true)
        }
    }else dangerAlert("Пустой адрес", true)
}