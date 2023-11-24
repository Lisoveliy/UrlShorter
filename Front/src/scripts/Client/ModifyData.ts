import { Link } from "../Models/Link";
import { Routes } from "../routes";
import { parseError } from "./ErrorParser";

/*
    Class for handle submit event
*/
export class ModifyData {
    constructor(e?: SubmitEvent, updatedlink?: Link) {
        if (e)
            switch (e.submitter.id) {
                case "removebutton":
                    this.removeLink(updatedlink)
                    break;
                case "submitbutton":
                    this.modifyLink(updatedlink)
                    break;
                default:
            }
        else this.modifyLink(updatedlink)
    }

    private async removeLink(updatedlink: Link) {
        let response = await fetch(import.meta.env.VITE_BackEndpoint + Routes.removeLink + new URLSearchParams({
            id: String(updatedlink.id)
        }), {
            method: "DELETE"
        })
        if (response.ok) {
            document.location.href = "/"
            sessionStorage.setItem("operation", "removed")
        } else {
            parseError(response)
        }
    }
    private async modifyLink(updatedlink: Link) {
        let response = await fetch(import.meta.env.VITE_BackEndpoint + Routes.updateLink, {
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
        if (response.ok) {
            document.location.href = "/"
            sessionStorage.setItem("operation", "updated")
        } else parseError(response)
    }
}

