import { navigate } from "./main.js";
import { render as tempRender, getSelectedFields } from "./temp.js";
import { buildResume } from "./generator.js";


const content = document.getElementById('downloadView');

function render(){ //render function called by other pages to render this page
    content.innerHTML = "<h2>Download your resume!</h2><p>Preview your resume below. Please navigate to the previous sections if you need to make any changes.</p>";
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