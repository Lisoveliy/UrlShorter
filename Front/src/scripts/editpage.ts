import '../styles/style.scss'
import '../styles/edit.scss'
import { Link } from './Models/Link'
import { dangerAlert } from './alerts'
import { ModifyData } from './Client/ModifyData'
import { getLinkData } from './Client/GetData'

/*
    Main module for edit.html
*/

const urlid = Number(new URLSearchParams(window.location.search).get('id'))
let shorturl = <HTMLInputElement>document.getElementById('shortUrlInput')
let shortedurl = <HTMLInputElement>document.getElementById('shortedUrlInput')
let counter = <HTMLElement>document.getElementById('times')
let resetcounter = <HTMLInputElement>document.getElementById('resetCounter')
let recivedLink: Link

//Validate query params
if (!urlid) {
    dangerAlert()
}
else {
    try {
        recivedLink = await getLinkData(urlid)
        if (recivedLink.id === undefined) {
            dangerAlert()
        } else AddDataIntoForm(recivedLink)
    } catch (_) {
        dangerAlert("Невозможно получить данные с сервера, проверьте подключение")
    }
}
function AddDataIntoForm(link: Link) {
    shorturl.value = link.realUrl
    shortedurl.value = import.meta.env.VITE_BackEndpoint.concat("/", link.shortUrl)
    counter.textContent = String(link.countOfTransitions)
}

//Listen events of submit
document.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        if (recivedLink.id !== undefined) {
            recivedLink.realUrl = shorturl.value
            recivedLink.countOfTransitions = resetcounter.checked == true ? 0 : recivedLink.countOfTransitions
            new ModifyData(null, recivedLink)
        }
    }
})
document.getElementById('modify-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (recivedLink.id !== undefined) {
        recivedLink.realUrl = shorturl.value
        recivedLink.countOfTransitions = resetcounter.checked == true ? 0 : recivedLink.countOfTransitions
        new ModifyData(e, recivedLink)
    }
})