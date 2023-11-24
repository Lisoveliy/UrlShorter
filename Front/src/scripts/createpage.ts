import '../styles/style.scss'
import '../styles/edit.scss'
import { createLink } from './Client/AddData';

/*
    Main module for create.html
*/

//Input Field
let shorturl = <HTMLInputElement>document.getElementById('shortUrlInput')

//Listen events of submit
document.addEventListener('keypress', async (e)=> {
    if(e.key == "Enter")
    await createLink(shorturl.value)
})
document.getElementById('createform').addEventListener('submit',async (e) => {
    e.preventDefault()
    await createLink(shorturl.value)
})
//Submit function