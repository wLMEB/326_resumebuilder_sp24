import { navigate } from "./main.js";
import { render as tempRender } from "./temp.js";
import * as db from "./db.js";
const content = document.getElementById('infoView');
// Array of fields to be rendered
export const fields = ['Name', 'Email', 'Phone Number', 'School', 'Start - End date', 'Degree', 'Organization', 'Position', 'Duration', 'Description', 'Skills'];

/**
 * This function dynamically generates a field with a label and an input element. It also creates a subheader based on the fieldName.
 * 
 * @param {string} fieldName - The name of the field to generate. This will be used as the text for the label and to determine the subheader.
 * @returns {void} This function does not return anything.
 */
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

/**
 * This function dynamically generates a button, sets its text, adds it to the content element, and sets its click event listener.
 * 
 * @param {string} name - The text that will be displayed on the button.
 * @param {string} page - The page to navigate to when the button is clicked.
 * @param {Function} rend - The function to execute when the button is clicked.
 * @returns {void} This function does not return anything.
 */
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

/**
 * This function creates an h2 element, sets its text to "Input your information:", and appends it to the content element.
 * 
 * @returns {void} This function does not return anything.
 */
function addHeadernText(){
    const header = document.createElement('h2');
    header.innerText = "Input your information:";
    content.appendChild(header); 
}

/**
 * This function called by other pages to render this page. It clears the content element, adds a header text, generates fields for each field in the 'fields' array, and adds two buttons: "Back" and "Submit".
 * 
 * The "Back" button navigates to the 'landingView' when clicked.
 * The "Submit" button stores the data to the database and renders the 'templateView' when clicked.
 * 
 * @returns {void} This function does not return anything.
 */
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


/**
 * This asynchronous function gets all the input elements with the class 'inputs', stores their values in an array, and adds each non-empty value to the database with the corresponding field name.
 * 
 * @async
 * @returns {Promise<void>} A Promise that resolves when all the non-empty values have been added to the database.
 */
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