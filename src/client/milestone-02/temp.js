import { navigate } from "./main.js";
import { render as infoRender, fields } from "./info.js";

import { render as downloadRender } from "./download.js";
import * as db from "./db.js";

const content = document.getElementById('templateView');

function render(){ //render function called by other pages to render this page
    content.innerHTML = "<h2>Select a template!</h2><p>We have several hand-crafted professional resume templates ready for you to choose! Simply select any one of them, and continue to finalize your resume.</p>";
    content.appendChild(document.createElement("br"));

    showInfomations();
    addButton("Back","infoView", infoRender);
    addButton("Select", "downloadView", downloadRender);
}

function addButton(name, page,ren){ // Generate button dynamically and set their event listeners
    const button = document.createElement('button'); // to navigate to the requested page
    button.classList.add("btn", "btn-outline-secondary");
    button.innerText = `${name}`; 
    content.appendChild(button);
    button.addEventListener("click", () => {
        
        ren();
        navigate(`${page}`);
    });

}

async function showInfomations(){
    
    const list = document.createElement("ol");
    content.appendChild(list);
    for (let field of fields){
        const item = document.createElement("li");
        try{
            item.innerText = `${field}: ${await db.getInfo(field)}`;
        }catch(err){
            //item.innerText = `${field}: `;
            continue;
        }
        
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "delete";
        deleteButton.addEventListener("click", async () => {
            try{
                await db.deleteInfo(field);
            item.remove();
            }catch(err){
                console.log(err);
            }
        });
        item.appendChild(deleteButton);
        list.appendChild(item);
    }
}

export {render};