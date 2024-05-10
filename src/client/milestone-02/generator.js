
let win = null;
let resume = null;
let types = ["Personal","Education","Experience","Other"];
// let numExperience = getNumExperience()
/**
 * This function opens a new window and builds a resume in it. It creates an h1 element, sets its text, and appends it to the body of the new window's document.
 * 
 * @param {Object} fields - The fields to be included in the resume.
 * @returns {void} This function does not return anything.
 */

async function buildResume(promise,style){
    // 
    console.log(promise);
    let fields = [];
    try{
        fields = await promise;
    }catch(err){
        console.log(err);
    }
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
    for(let field of fields ){
       let type = field._id.split('-')[0];
        
        let group = resume.getElementById(type);
        if (group === null){ 
            group = resume.getElementById("Experience")
        }
        let data = resume.createElement('div');
        data.innerText = field.value;
        data.id = field._id.split('-')[1];
        if(data.id === "Name" || data.id === "Email" || data.id === "Phone Number"){
            group = resume.getElementById("Personal");
        }
        group.appendChild(data);
    }
}



/**
 * This function returns the global 'win' variable, which is expected to be a Window object.
 * 
 * @returns {Window} The global 'win' variable.
 */
function getWindow(){
    return win;
}
export {buildResume,getWindow};