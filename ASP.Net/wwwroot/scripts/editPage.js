import { dangerAlert } from './alerts.js';
import { ModifyData } from './Client/modifyData.js';
import { getLinkData } from './Client/getData.js';
import { Routes } from './routes.js';
/*
    Main module for edit.html
*/
const urlid = Number(new URLSearchParams(window.location.search).get('id'));
let shorturl = document.getElementById('shortUrlInput');
let shortedurl = document.getElementById('shortedUrlInput');
let counter = document.getElementById('times');
let resetcounter = document.getElementById('resetCounter');
let recivedLink;
//Validate query params
if (!urlid) {
    dangerAlert();
}
else {
    try {
        recivedLink = await getLinkData(urlid);
        if (recivedLink.id === undefined) {
            dangerAlert();
        }
        else
            AddDataIntoForm(recivedLink);
    }
    catch (_) {
        dangerAlert("Невозможно получить данные с сервера, проверьте подключение");
    }
}
function AddDataIntoForm(link) {
    shorturl.value = link.realUrl;
    shortedurl.value = location.protocol.concat('//', location.host, Routes.shortLinks, link.shortUrl);
    counter.textContent = String(link.countOfTransitions);
}
//Listen events of submit
document.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        if (recivedLink.id !== undefined) {
            recivedLink.realUrl = shorturl.value;
            recivedLink.countOfTransitions = resetcounter.checked == true ? 0 : recivedLink.countOfTransitions;
            new ModifyData(null, recivedLink);
        }
    }
});
document.getElementById('modify-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (recivedLink.id !== undefined) {
        recivedLink.realUrl = shorturl.value;
        recivedLink.countOfTransitions = resetcounter.checked == true ? 0 : recivedLink.countOfTransitions;
        new ModifyData(e, recivedLink);
    }
});
