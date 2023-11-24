import { IElement } from "./IElement"

export class TableElement implements IElement{
  public constructor(public extUrl: string, public intUrl: string, public timeofcreation: string, public counter: number, table: HTMLTableElement){
    const mainel = table.insertRow();

    const extEl = mainel.insertCell(),
    intEl = mainel.insertCell(),
    timeofcreationEl = mainel.insertCell(),
    counterEl = mainel.insertCell()
    
    extEl.append(this.generateLink(extUrl, extUrl))
    intEl.append(this.generateLink(intUrl, intUrl))
    timeofcreationEl.append(this.generateElement('p', timeofcreation))
    counterEl.append(this.generateElement('p', String(counter)))
    this.mainElement = mainel
  }
  mainElement: HTMLElement

  private generateElement(tag: string, content?: string): HTMLElement {
    let mainel = document.createElement(tag)
    mainel.textContent = content ?? ""
    return mainel
  }
  private generateLink(href: string, content?: string): HTMLAnchorElement {
    let mainel = document.createElement('a')
    mainel.textContent = content ?? ""
    mainel.href = href
    return mainel

  }
}