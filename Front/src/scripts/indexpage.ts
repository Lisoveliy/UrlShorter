import '../style.scss'
import { TableElement } from './Components/TableElement'
import { Configuration } from '../configuration'
import { Link } from './DTO/Link'
import { Routes } from './routes'
import { dangerAlert, goodAlert } from './alerts'

switch(sessionStorage.getItem("operation")){
  case "updated":
    goodAlert("Успешно обновлено!")
    sessionStorage.removeItem("operation")
    break;
  case "removed":
    goodAlert("Успешно удалено!")
    sessionStorage.removeItem("operation")
    break;
  case "created":
    let message = "Ссылка создана: " + 
    Configuration.BackEndpoint.concat('/', 
    (<Link>JSON.parse(sessionStorage.getItem("object"))).shortUrl)
    goodAlert(message, 4000)
      sessionStorage.removeItem("object")
      sessionStorage.removeItem("operation")
}

const table = <HTMLTableElement>document.getElementById('table_inner')
try {
  const links = await getLinks()
  RenderTable(links)
}
catch (_) {
  dangerAlert("Невозможно получить данные с сервера, проверьте подключение")
}
async function getLinks(): Promise<Link[]> {
  let counter = 0
  let offset = 30
  let links: Link[] = []
  let tlinks: Link[] = []
  do {

    tlinks = await requestLinks(counter, offset)
    links.push(...tlinks)
    counter += offset

  } while (tlinks.length >= offset)
  return links
}

async function requestLinks(offset: number, count: number): Promise<Link[]> {
  let response = await fetch(Configuration.BackEndpoint + Routes.getLinks + new URLSearchParams({
    offset: String(offset),
    count: String(count)
  }), {
    method: "get"
  })
  return <Link[]>(await response.json())
}

function RenderTable(links: Link[]) {
  links.forEach(element => {
    new TableElement(element.id, element.realUrl, Configuration.BackEndpoint.concat("/", element.shortUrl), element.creationDate, element.countOfTransitions, table)
  })
}