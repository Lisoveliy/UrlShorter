import { createLink } from './Client/addData.js';
/*
    Main module for create.html
*/
//Input Field
let shorturl = document.getElementById('shortUrlInput');
//Listen events of submit
document.addEventListener('keypress', async (e) => {
    if (e.key == "Enter")
        await createLink(shorturl.value);
});
document.getElementById('createform').addEventListener('submit', async (e) => {
    e.preventDefault();
    await createLink(shorturl.value);
});
//Submit function
