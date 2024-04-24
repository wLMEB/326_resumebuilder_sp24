let win = null;

/**
 * This function opens a new window and builds a resume in it. It creates an h1 element, sets its text, and appends it to the body of the new window's document.
 * 
 * @param {Object} fields - The fields to be included in the resume.
 * @returns {void} This function does not return anything.
 */
function buildResume(fields){
    win = window.open("", "_blank", "width=800 ,height=1000 ,top=100,left=100" )
    const resume = win.document;
    let header = resume.createElement('h1')
    header.innerText = "testttt"
    console.log(header);
    resume.body.appendChild(header)
    console.log(resume);
    console.log(fields);
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