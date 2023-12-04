import { TableRenderer } from './Components/TableRenderer.js';
import { Routes } from './routes.js';
import { dangerAlert, goodAlert } from './alerts.js';
import { getLinks } from './Client/getData.js';
/*
    Main module for index.html
*/
switch (sessionStorage.getItem("operation")) {
    case "updated":
        goodAlert("Успешно обновлено!");
        sessionStorage.removeItem("operation");
        break;
    case "removed":
        goodAlert("Успешно удалено!");
        sessionStorage.removeItem("operation");
        break;
    case "created":
        let message = "Ссылка создана: " +
            location.host.concat(Routes.shortLinks, JSON.parse(sessionStorage.getItem("object")).shortUrl);
        goodAlert(message, 4000);
        sessionStorage.removeItem("object");
        sessionStorage.removeItem("operation");
}
const table = document.getElementById('table_inner');
try {
    const links = await getLinks();
    RenderTable(links);
}
catch (_) {
    dangerAlert("Невозможно получить данные с сервера, проверьте подключение");
}
function RenderTable(links) {
    links.forEach(element => {
        new TableRenderer(element.id, element.realUrl, Routes.shortLinks + element.shortUrl, element.creationDate, element.countOfTransitions, table);
    });
}
