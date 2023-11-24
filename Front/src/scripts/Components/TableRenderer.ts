/*
  Class for render table of link values
*/

export class TableRenderer{
  public constructor(id: number, public extUrl: string, public intUrl: string, public timeofcreation: string, public counter: number, table: HTMLTableElement){
    const mainel = table.insertRow();

    const extEl = mainel.insertCell(),
    intEl = mainel.insertCell(),
    timeofcreationEl = mainel.insertCell(),
    counterEl = mainel.insertCell()
    
    extEl.append(this.generateLink(extUrl, extUrl))
    intEl.append(this.generateLink(intUrl, intUrl))
    timeofcreationEl.append(this.generateElement('p', timeofcreation))
    let button = this.getButton(id)
    counterEl.append(this.getCounter(counter, button))
  }

  private getCounter(counter: number, button: HTMLAnchorElement){
    let counterdiv = this.generateElement('div', '<p>' + String(counter) +'</p>')
    counterdiv.className = "table__flex-counter"
    counterdiv.append(button)
    return counterdiv;
  }
  private getButton(id: number){
    let button = document.createElement('a')
    button.className = "btn btn-primary table__button"
    button.href = "edit.html?id=" + String(id)
    button.role = "button"
    button.textContent = "Изменить"
    return button;
  }
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