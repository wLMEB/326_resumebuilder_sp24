import { navigate } from "./main.js";
import { render as infoRender } from "./info.js";
import { render as downloadRender } from "./download.js";

const content = document.getElementById('templateView');

function render(){
    content.innerHTML = "";
    content.textContent = "to be implemented for selecting templates, select button is temporatay for navigating through pages"
    content.appendChild(document.createElement("br"));
    addButton("back","infoView", infoRender);
    addButton("select", "downloadView", downloadRender);
}

function addButton(name, page,ren){
    const button = document.createElement('button');
    button.innerText = `${name}`; 
    content.appendChild(button);
    button.addEventListener("click", () => {
        
        ren();
        navigate(`${page}`);
    });
}

export {render};