const content = document.getElementById('content');

let fields = ['First Name', 'Last Name', 'Email', 'Education'];

function render(fieldName){
    const fieldLabel = document.createElement('label');
    const field = document.createElement('input');
    fieldLabel.innerText=`${fieldName}: `;
    
    content.appendChild(fieldLabel);
    content.appendChild(field);
    content.appendChild(document.createElement('br'));
}

fields.forEach(field => render(field));