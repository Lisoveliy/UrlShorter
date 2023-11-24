import '../style.scss'
import { TableElement } from './Components/TableElement'
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
    import.meta.env.VITE_BackEndpoint.concat(Routes.shortLinks, 
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
  console.log(import.meta.env)
  dangerAlert("Невозможно получить данные с сервера, проверьте подключение")
}
async function getLinks(): Promise<Link[]> {
  let offset = 0
  let limit = 30
  let links: Link[] = []
  let tlinks: Link[] = []
  do {

    tlinks = await requestLinks(offset, limit)
    links.push(...tlinks)
    offset += limit

  } while (tlinks.length >= limit)
  return links
}

async function requestLinks(offset: number, count: number): Promise<Link[]> {
  let response = await fetch(import.meta.env.VITE_BackEndpoint + Routes.getLinks + new URLSearchParams({
    offset: String(offset),
    count: String(count)
  }), {
    method: "get"
  })
  return <Link[]>(await response.json())
}

function RenderTable(links: Link[]) {
  links.forEach(element => {
    new TableElement(element.id, element.realUrl, import.meta.env.VITE_BackEndpoint.concat(Routes.shortLinks, element.shortUrl), element.creationDate, element.countOfTransitions, table)
  })
}