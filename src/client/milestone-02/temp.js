import { navigate } from "./main.js";
import { render as infoRender, fields } from "./info.js";

import { render as downloadRender } from "./download.js";
import * as db from "./db.js";

const content = document.getElementById("templateView");
let selectedStyle = 1;
export let selectedFields = [];

/**
 * This function called by other pages to render this page. It sets the innerHTML of the content element to a predefined string, adds a line break, clears the 'selectedFields' array, shows the information, and adds two buttons: "Back" and "Select".
 * 
 * The "Back" button navigates to the 'infoView' and calls the 'infoRender' function when clicked.
 * The "Select" button navigates to the 'downloadView' and calls the 'downloadRender' function when clicked.
 * 
 * @returns {void} This function does not return anything.
 */
function render(){ //render function called by other pages to render this page
    content.innerHTML = "<h2>Select your information and a template!</h2><p>Choose what you want to be included in your resume by hitting the select buttons. We have several hand-crafted professional resume templates ready for you to choose! Simply select any one of them, and continue to finalize your resume.</p>";
    content.appendChild(document.createElement("br"));
    selectedFields = [];
    let infoHeader = document.createElement('h3')
    infoHeader.innerText = "Choose your info"
    content.appendChild(infoHeader)
    showInformations();
    let tempHeader = document.createElement('h3')
    tempHeader.innerText = "Choose your template"
    content.appendChild(tempHeader)
    showTemplate();
    addButton("Back","infoView", infoRender);
    addButton("Confirm", "downloadView", downloadRender);
    

}

/**
 * This function dynamically generates a button, sets its text, adds it to the content element, and sets its click event listener.
 * 
 * @param {string} name - The text that will be displayed on the button.
 * @param {string} page - The page to navigate to when the button is clicked.
 * @param {Function} ren - The function to execute when the button is clicked.
 * @returns {void} This function does not return anything.
 */
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

/**
 * This asynchronous function creates an list, fetches all the information from the database, and for each piece of information, creates a list item with the field name and value, a delete button, and a select button.
 * 
 * The delete button, when clicked, deletes the field from the database and removes the list item.
 * The select button, when clicked, adds the field to the 'selectedFields' array if it is not already included.
 * 
 * @async
 * @returns {Promise<void>} A Promise that resolves when all the information has been fetched from the database and the list has been created.
 */
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
        item.appendChild(deselectButton)
      }
    })
    const deselectButton = document.createElement("button");
    deselectButton.innerText = "deselect";
    deselectButton.addEventListener("click", ()=>{
      if(selectedFields.includes(field)){
        selectedFields.pop(field);
        item.removeChild(deselectButton)
        
      }
    })
    item.appendChild(deleteButton);
    item.appendChild(selectButton);
    
    list.appendChild(item);
  }
}

function showTemplate(){
  let tempCount = 2;
  const container = document.createElement('div');
  for(let i = 1; i<=tempCount; i++){
    const temp = document.createElement('div')
    const t = document.createElement('img')
    
    const tselect = document.createElement("button");
    tselect.id = i;
    tselect.innerText = "select";
    tselect.addEventListener("click", ()=>{
        selectedStyle = i;
        document.getElementById("curSelect").innerText=`Current template selection: ${selectedStyle}`;
        
      })
    t.innerText="embed image here"
    temp.appendChild(t);
    temp.appendChild(tselect)
    container.appendChild(temp)
    content.appendChild(container)
  }
  const currentSelection = document.createElement('div')
  currentSelection.innerText = `Current template selection: ${selectedStyle}`;
  currentSelection.id = "curSelect"
  container.appendChild(currentSelection)

}
/**
 * This function returns the 'selectedFields' array.
 * 
 * @returns {Array} The 'selectedFields' array.
 */
function getSelectedFields() {
  return selectedFields;
}

/**
 * This function returns the 'selectedStyle' variable.
 * 
 * @returns {string} The 'selectedStyle' string.
 */
function getSelectedStyle(){
    return selectedStyle;
}
export { render, getSelectedFields,getSelectedStyle };
