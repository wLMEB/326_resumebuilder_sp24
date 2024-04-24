import { navigate } from "./main.js";
import { render as tempRender } from "./temp.js";

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
    content.innerHTML = "";
    content.textContent = "to be implemented for downloading"
    content.appendChild(document.createElement("br"));
    addButton("back","templateView", tempRender);
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
    button.innerText = `${name}`;
    content.appendChild(button);
    button.addEventListener("click", () => {
        console.log(ren)
        ren();
        navigate(`${page}`);
    });
}

export {render};