let win = null;

function buildResume(fields){
    win = window.open('', ' ')
    const resume = win.document;
    let header = resume.createElement('h1')
    header.innerText = "testttt"
    console.log(header);
    resume.body.appendChild(header)
    console.log(resume);
    console.log(fields);
}


function getWindow(){
    return win;
}
export {buildResume,getWindow};