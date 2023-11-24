import { Link } from "../Models/Link"
import { Routes } from "../routes"

export async function getLinks(): Promise<Link[]> {
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

export async function getLinkData(id: number): Promise<Link> {
    var response = await fetch(import.meta.env.VITE_BackEndpoint + Routes.getLink + id)
    return <Link>await response.json()
}