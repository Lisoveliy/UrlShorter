/*
  Class for render table of link values
*/
export class TableRenderer {
    constructor(id, extUrl, intUrl, timeofcreation, counter, table) {
        const mainel = table.insertRow();
        const extEl = mainel.insertCell(), intEl = mainel.insertCell(), timeofcreationEl = mainel.insertCell(), counterEl = mainel.insertCell();
        extEl.append(this.generateLink(extUrl, extUrl));
        intEl.append(this.generateLink(location.protocol.concat('//', location.host, intUrl), location.protocol.concat('//', location.host, intUrl)));
        timeofcreationEl.append(this.generateElement('p', timeofcreation));
        let button = this.getButton(id);
        counterEl.append(this.getCounter(counter, button));
    }
    getCounter(counter, button) {
        let counterdiv = this.generateElement('div', '<p>' + String(counter) + '</p>');
        counterdiv.className = "table__flex-counter";
        counterdiv.append(button);
        return counterdiv;
    }
    getButton(id) {
        let button = document.createElement('a');
        button.className = "btn btn-primary table__button";
        button.href = "edit.html?id=" + String(id);
        button.role = "button";
        button.textContent = "Изменить";
        return button;
    }
    generateElement(tag, content) {
        let mainel = document.createElement(tag);
        mainel.innerHTML = content ?? "";
        return mainel;
    }
    generateLink(href, content) {
        let mainel = document.createElement('a');
        mainel.textContent = content ?? "";
        mainel.href = href;
        mainel.target = "_blank";
        return mainel;
    }
}
