import { Routes } from "../routes.js";
export async function getLinkData(id) {
    var response = await fetch(Routes.getLink + id);
    return await response.json();
}
export async function getLinks() {
    let offset = 0;
    let limit = 30;
    let links = [];
    let tlinks = [];
    do {
        tlinks = await requestLinks(offset, limit);
        links.push(...tlinks);
        offset += limit;
    } while (tlinks.length >= limit);
    return links;
}
async function requestLinks(offset, count) {
    let response = await fetch(Routes.getLinks + new URLSearchParams({
        offset: String(offset),
        count: String(count)
    }), {
        method: "get"
    });
    return (await response.json());
}
