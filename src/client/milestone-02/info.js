import { navigate } from "./main.js";
import { render as tempRender } from "./temp.js";
const content = document.getElementById('infoView');
let fields = ['First Name', 'Last Name', 'Email', 'Education'];

function fieldGen(fieldName){
    const fieldLabel = document.createElement('label');
    const field = document.createElement('input');
    fieldLabel.innerText=`${fieldName}: `;
    
    content.appendChild(fieldLabel);
    content.appendChild(field);
    content.appendChild(document.createElement('br'));
}
function addButton(name, page, rend){
    const button = document.createElement('button');
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
function render(){
    content.innerHTML = "";
    addHeadernText();
    fields.forEach(field => fieldGen(field));
    addButton("back", "landingView", ()=>null);
    addButton("submit" , "templateView", tempRender);
    console.log("Rendered");
}

export {render};