import './style.scss'
import { TableElement } from './Components/TableElement';
import { Configuration } from './configuration';

let table = <HTMLTableElement>document.getElementById('table_inner');

fetch(Configuration.BackEndpoint + "/Links/get?" + new URLSearchParams({
  offset: "0",
  count: "30"
}),{
  method: "get"
}).then(
  x => console.log(x))

new TableElement("test", "test2", 'asodpgij', 5, table)
new TableElement("test", "test2", 'asodpgij', 5, table)
new TableElement("test", "test2", 'asodpgij', 5, table)
new TableElement("test", "test2", 'asodpgij', 5, table)
new TableElement("test", "test2", 'asodpgij', 5, table)

// <template id="tableelement">
// <tr>
//     <td><a id="extUrl">1</a></td>
//     <td><a id="intUrl">2</a></td>
//     <td><p class="text-bg-info" id="timeofcreation">3</p></td>
//     <td><p id="counter">4</p></td>
// </tr>
// </template>