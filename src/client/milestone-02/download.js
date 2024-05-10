import { navigate } from "./main.js";
import { render as tempRender, getSelectedStyle } from "./temp.js";
import { buildResume } from "./generator.js";
import {getWindow} from "./generator.js";
import * as db from './db.js';

let selectedFields = [];
const content = document.getElementById('downloadView');

/**
 * This function is called by other pages to render the download page. It sets the innerHTML of the content element,
 * adds a line break, and adds three buttons: "Back", "Preview", and "Download".
 * 
 * The "Back" button calls the `tempRender` function when clicked.
 * The "Preview" button builds the resume preview with the selected fields when clicked.
 * The "Download" button prints the window when clicked.
 * 
 * @returns {void} This function does not return anything.
 */
function render(){ //render function called by other pages to render this page
    content.innerHTML = "<h2>Download your resume!</h2><p>Hit Preview button will have resume pop up in a new window. Leave the window open to select download button to print out resume. Please navigate to the previous sections if you need to make any changes.</p> <p>When printing out the resume, please select to include background graphics in Setting Options</p>";
    content.appendChild(document.createElement("br"));
    addButton("Back","templateView", tempRender);
    addButton("Preview", "downloadView", ()=>{buildResume(getSelectedFields(),getSelectedStyle())});
    addButton("Download", "downloadView", ()=>{getWindow().print()});
}

/**
 * This asynchronous function retrieves all information from the database.
 * 
 * If the operation is successful, it logs the retrieved information to the console and returns it.
 * 
 * If the operation fails, it logs the error to the console.
 * 
 * @async
 * @returns {Promise<object>} A Promise that resolves with the retrieved information if the operation is successful, or undefined if the operation fails.
 */
async function getSelectedFields(){
    try{
        const selectedFields = await db.getAllInfo();
        console.log("information that will be generated:");
        console.log(selectedFields);
        return selectedFields;
    }catch (err){
        console.error(err);
    }
    
}

/**
 * This function dynamically generates a button, sets its text, adds it to the content element, and sets its click event listener.
 * 
 * @param {string} name - The text that will be displayed on the button.
 * @param {string} page - The page to navigate to when the button is clicked.
 * @param {Function} ren - The function to execute when the button is clicked.
 * @returns {void} This function does not return anything.
 */
function addButton(name, page, ren){ // Generate button dynamically and set their event listeners
    const button = document.createElement('button');
    button.classList.add("btn", "btn-outline-secondary");
    button.innerText = `${name}`;
    content.appendChild(button);
    button.addEventListener("click", () => {
       // console.log(ren)
        ren();
        navigate(`${page}`);
    });
}

export {render};