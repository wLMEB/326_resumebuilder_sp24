import { navigate } from "./main.js";
import { render as infoRender } from "./info.js";
import { render as downloadRender } from "./download.js";

const content = document.getElementById('templateView');

function render(){ //render function called by other pages to render this page
    content.innerHTML = "";
    content.textContent = "to be implemented for selecting templates, select button is temporatay for navigating through pages"
    content.appendChild(document.createElement("br"));
    addButton("back","infoView", infoRender);
    addButton("select", "downloadView", downloadRender);
}

function addButton(name, page,ren){ // Generate button dynamically and set their event listeners
    const button = document.createElement('button'); // to navigate to the requested page
    button.innerText = `${name}`; 
    content.appendChild(button);
    button.addEventListener("click", () => {
        
        ren();
        navigate(`${page}`);
    });
}

export {render};