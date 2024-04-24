import { navigate } from "./main.js";
import { render as tempRender, getSelectedFields } from "./temp.js";
import { buildResume } from "./generator.js";


const content = document.getElementById('downloadView');

function render(){ //render function called by other pages to render this page
    content.innerHTML = "";
    content.textContent = "resume preview:"
    let newWindow = window.open('', ' ')
    //getSelectedFields()
    // console.log(getSelectedFields());
    content.appendChild(document.createElement("br"));
    addButton("Back","templateView", tempRender);
    addButton("Preview", "downloadView", buildResume);
}

function addButton(name, page,ren){ // Generate button dynamically and set their event listeners
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