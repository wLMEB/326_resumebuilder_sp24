import { navigate } from "./main.js";
import { render as tempRender } from "./temp.js";

const content = document.getElementById('downloadView');

function render(){
    content.innerHTML = "";
    content.textContent = "to be implemented for downloading"
    content.appendChild(document.createElement("br"));
    addButton("back","templateView", tempRender);
}

function addButton(name, page,ren){
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