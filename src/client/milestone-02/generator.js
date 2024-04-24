import * as db from './db.js';
let win = null;
let resume = null;
let types = ["Personal","Education","Experience","Other"];
function buildResume(fields,style){
    win = window.open("", "_blank", "width=800 ,height=1000 ,top=100,left=100" )
    resume = win.document;
    let css = resume.createElement('link');
    css.type = "text/css";
    css.rel = 'stylesheet';
    css.href = `./template${style}.css`;
    resume.head.appendChild(css);
    let header = resume.createElement('h1');
    console.log(header);
    resume.body.appendChild(header)
    console.log(resume);
    console.log(fields);
    types.forEach(type =>{
        let group = resume.createElement('div');
        group.id = type;
        let subHeader = resume.createElement('h3');
        subHeader.innerText = type;
        
        resume.body.appendChild(group);
        group.appendChild(subHeader);
    })
    fields.forEach(field =>{
        let group = resume.getElementById(field._id.split('-')[0]);
        let data = resume.createElement('div');
        data.innerText = field.value;
        data.id = field._id.split('-')[1];
        group.appendChild(data);
    })
}


function getWindow(){
    return win;
}
export {buildResume,getWindow};