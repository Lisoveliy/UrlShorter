import { createLink } from './Client/addData.js';
/*
    Main module for create.html
*/
//Input Field
let shorturl = document.getElementById('shortUrlInput');
//Listen events of submit
document.getElementById('create-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await createLink(shorturl.value);
});
//Submit function