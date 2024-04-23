import { navigate } from "./main.js";
import { render as tempRender } from "./temp.js";

const content = document.getElementById('downloadView');

function render(){ //render function called by other pages to render this page
    content.innerHTML = "";
    content.textContent = "to be implemented for downloading"
    content.appendChild(document.createElement("br"));
    addButton("back","templateView", tempRender);
}

function addButton(name, page,ren){ // Generate button dynamically and set their event listeners
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