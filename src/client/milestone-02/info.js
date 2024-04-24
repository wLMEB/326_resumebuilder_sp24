import { navigate } from "./main.js";
import { render as tempRender } from "./temp.js";
import * as db from "./db.js";
const content = document.getElementById('infoView');
// Array of fields to be rendered
export const fields = ['Name', 'Email', 'Phone Number', 'School', 'Start - End date', 'Degree', 'Organization', 'Position', 'Duration', 'Description', 'Skills'];

function fieldGen(fieldName){ // Generate each field dynamically
    const fieldLabel = document.createElement('label');
    const field = document.createElement('input');
    const subHeader = document.createElement('h4');

    fieldLabel.innerText=`${fieldName}: `;
    field.classList.add('inputs');

    if (fieldName === "Name"){
        subHeader.innerText = "Personal";
        content.appendChild(subHeader);
    }
    
    content.appendChild(fieldLabel);
    content.appendChild(field);
    content.appendChild(document.createElement('br'));
    switch (fieldName){
        case "Phone Number":
            subHeader.innerText = "Education";
            content.appendChild(subHeader);
            break;
        case "Degree":
            subHeader.innerText = "Experience";
            content.appendChild(subHeader);
            break;
        case "Description":
            subHeader.innerText = "Other";
            content.appendChild(subHeader);
    }
}
function addButton(name, page, rend){ // Generate button dynamically and set their event listeners
    const button = document.createElement('button'); // to navigate to the requested page
    button.classList.add("btn", "btn-outline-secondary");
    button.innerText = `${name}`;
    content.appendChild(button);
    button.addEventListener("click", () => {
        rend();
        navigate(`${page}`);
    });
}
function addHeadernText(){
    const header = document.createElement('h2');
    header.innerText = "Input your information:";
    content.appendChild(header); 
}
function render(){              //render function called by other pages to render this page
    content.innerHTML = "";
    addHeadernText();
    fields.forEach(field => fieldGen(field));
    addButton("Back", "landingView", ()=>null);
    addButton("Submit" , "templateView", ()=>{
                                    storingTODB();
                                    tempRender();
                                    
                                });
    console.log("Rendered");
}

async function storingTODB(){
    const inputs = document.querySelectorAll('.inputs');
    let values = [];
    inputs.forEach(input => values.push(input.value));
    console.log(values);
    for(let i = 0; i < inputs.length; i++){
        if(values[i] != ""){
            await db.addInfo(fields[i], values[i]);
        }
        
    }
}

export {render};