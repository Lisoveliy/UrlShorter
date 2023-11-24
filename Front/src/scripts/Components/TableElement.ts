import { IElement } from "./IElement"

export class TableElement implements IElement{
  public constructor(id: number, public extUrl: string, public intUrl: string, public timeofcreation: string, public counter: number, table: HTMLTableElement){
    const mainel = table.insertRow();

    const extEl = mainel.insertCell(),
    intEl = mainel.insertCell(),
    timeofcreationEl = mainel.insertCell(),
    counterEl = mainel.insertCell()
    //buttonEl = mainel.insertCell()
    extEl.append(this.generateLink(extUrl, extUrl))
    intEl.append(this.generateLink(intUrl, intUrl))
    timeofcreationEl.append(this.generateElement('p', timeofcreation))
    let button = document.createElement('a')
    button.className = "btn btn-primary"
    button.href = "edit.html?id=" + String(id)
    button.role = "button"
    button.textContent = "Изменить"
    let counterdiv = this.generateElement('div', '<p>' + String(counter) +'</p>')
    counterdiv.className = "tableflex"
    counterdiv.append(button)
    counterEl.append(counterdiv)

    this.mainElement = mainel
  }
  mainElement: HTMLElement

  private generateElement(tag: string, content?: string): HTMLElement {
    let mainel = document.createElement(tag)
    mainel.innerHTML = content ?? ""
    return mainel
  }
  private generateLink(href: string, content?: string): HTMLAnchorElement {
    let mainel = document.createElement('a')
    mainel.textContent = content ?? ""
    mainel.href = href
    return mainel

  }
}