import '../style.scss'
import '../edit.scss'
import { Configuration } from '../configuration'
import { Routes } from './routes'
import { Link } from './DTO/Link'
import { dangerAlert } from './alerts'
import { ModifyData } from './Forms/ModifyData'

const urlid = Number(new URLSearchParams(window.location.search).get('id'))
let shorturl = <HTMLInputElement>document.getElementById('shortUrlInput')
let shortedurl = <HTMLInputElement>document.getElementById('shortedUrlInput')
let counter = <HTMLElement>document.getElementById('times')
let resetcounter = <HTMLInputElement>document.getElementById('resetCounter')
let recivedLink: Link
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
document.getElementById('modifyform').addEventListener('submit', (e) => {
    recivedLink.realUrl = shorturl.value
    recivedLink.countOfTransitions = resetcounter.checked == true ? 0 : recivedLink.countOfTransitions 
    new ModifyData(e, recivedLink)
})

function AddDataIntoForm(link: Link) {
    shorturl.value = link.realUrl
    shortedurl.value = Configuration.BackEndpoint.concat("/", link.shortUrl)
    counter.textContent = String(link.countOfTransitions)
}

async function getLinkData(id: number): Promise<Link> {
    var response = await fetch(Configuration.BackEndpoint + Routes.getLink + id)
    return <Link>await response.json()
}