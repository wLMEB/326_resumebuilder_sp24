import { navigate } from "./main.js";
import { render as infoRender, fields } from "./info.js";

import { render as downloadRender } from "./download.js";
import * as db from "./db.js";

const content = document.getElementById("templateView");
let selectedStyle = 1;
export let selectedFields = [];

function render(){ //render function called by other pages to render this page
    content.innerHTML = "<h2>Select a template!</h2><p>We have several hand-crafted professional resume templates ready for you to choose! Simply select any one of them, and continue to finalize your resume.</p>";
    content.appendChild(document.createElement("br"));
    selectedFields = [];
    showInformations();
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

async function showInformations() {
  const list = document.createElement("ol");
  content.appendChild(list);
  let allFields = null;
  try{
    allFields = await db.getAllInfo();
  }catch(err){
    console.log(err);
  }
  for (let field of allFields) {
    const item = document.createElement("li");
    try {
      item.innerText = `${field._id}: ${await db.getInfo(field._id)}`;
    } catch (err) {
      //item.innerText = `${field}: `;
      continue;
    }
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", async () => {
      try {
        await db.deleteInfo(field._id);
        item.remove();
      } catch (err) {
        console.log(err);
      }
    });

    const selectButton = document.createElement("button");
    selectButton.innerText = "select";
    selectButton.addEventListener("click", ()=>{
      if(!selectedFields.includes(field)){
        selectedFields.push(field);
      }
    })
    item.appendChild(deleteButton);
    item.appendChild(selectButton);
    list.appendChild(item);
  }
}

function getSelectedFields() {
  return selectedFields;
}
function getSelectedStyle(){
    return selectedStyle;
}
export { render, getSelectedFields,getSelectedStyle };
