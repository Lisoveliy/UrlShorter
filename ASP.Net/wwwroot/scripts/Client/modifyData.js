import { Routes } from "../routes.js";
import { parseError } from "./errorParser.js";
/*
    Class for handle submit event
*/
export class ModifyData {
    constructor(e, updatedlink) {
        if (e)
            switch (e.submitter.id) {
                case "removebutton":
                    this.removeLink(updatedlink);
                    break;
                case "submitbutton":
                    this.modifyLink(updatedlink);
                    break;
                default:
            }
        else
            this.modifyLink(updatedlink);
    }
    async removeLink(updatedlink) {
        let response = await fetch(Routes.removeLink + new URLSearchParams({
            id: String(updatedlink.id)
        }), {
            method: "DELETE"
        });
        if (response.ok) {
            document.location.href = "/";
            sessionStorage.setItem("operation", "removed");
        }
        else {
            parseError(response);
        }
    }
    async modifyLink(updatedlink) {
        let response = await fetch(Routes.updateLink, {
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
        });
        if (response.ok) {
            document.location.href = "/";
            sessionStorage.setItem("operation", "updated");
        }
        else
            parseError(response);
    }
}
