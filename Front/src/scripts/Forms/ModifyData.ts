import { Configuration } from "../../configuration";
import { Link } from "../DTO/Link";
import { dangerAlert } from "../alerts";
import { Routes } from "../routes";

export class ModifyData {
    constructor(e: SubmitEvent, updatedlink?: Link) {
        switch (e.submitter.id) {
            case "removebutton":
                this.removeLink(updatedlink)
                break;
            case "submitbutton":
                this.modifyLink(updatedlink)
                break;
        }
    }
    private async removeLink(updatedlink: Link){
        let response = await fetch(Configuration.BackEndpoint + Routes.removeLink + new URLSearchParams({
            id: String(updatedlink.id)
        }),{
            method: "DELETE"
        })
        if(response.ok){
            document.location.href = "/"
            sessionStorage.setItem("operation", "removed")
        }else{
            dangerAlert()
        }
    }
    private async modifyLink(updatedlink: Link) {
        let response = await fetch(Configuration.BackEndpoint + Routes.updateLink, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: updatedlink.id,
                newlink: updatedlink.realUrl,
                resetcounter: updatedlink.countOfTransitions == 0
            })
        })
        if(response.ok){
            document.location.href = "/"
            sessionStorage.setItem("operation", "updated")
        }else{
            dangerAlert(null, true)
        }
    }
}
