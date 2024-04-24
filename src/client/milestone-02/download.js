import { navigate } from "./main.js";
import { render as tempRender, getSelectedFields, getSelectedStyle } from "./temp.js";
import { buildResume } from "./generator.js";
import {getWindow} from "./generator.js";


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
    content.innerHTML = "<h2>Download your resume!</h2><p>Preview your resume below. Please navigate to the previous sections if you need to make any changes.</p>";
    content.appendChild(document.createElement("br"));
    addButton("Back","templateView", tempRender);
    addButton("Preview", "downloadView", ()=>{buildResume(getSelectedFields(),getSelectedStyle())});
    addButton("Download", "downloadView", ()=>{getWindow().print()});
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