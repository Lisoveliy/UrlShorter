import '../styles/style.scss'
import '../styles/table.scss'
import '../styles/index.scss'
import { TableRenderer } from './Components/TableRenderer'
import { Link } from './Models/Link'
import { Routes } from './routes'
import { dangerAlert, goodAlert } from './alerts'
import { getLinks } from './Client/GetData'

/*
    Main module for index.html
*/

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
  dangerAlert("Невозможно получить данные с сервера, проверьте подключение")
}

function RenderTable(links: Link[]) {
  links.forEach(element => {
    new TableRenderer(element.id, element.realUrl, import.meta.env.VITE_BackEndpoint.concat(Routes.shortLinks, element.shortUrl), element.creationDate, element.countOfTransitions, table)
  })
}