import '../style.scss'
import '../edit.scss'

const urlid = new URLSearchParams(window.location.search).get('id')
let disableactions = false
if (!urlid) {
    var alertdiv = document.getElementById('alert_fetchfailed')
    alertdiv.style.display = "inline"
    disableactions = true
}

function getLinkData(id: number){
    //TODO
}