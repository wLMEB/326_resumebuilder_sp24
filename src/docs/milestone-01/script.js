const teamSection = document.getElementById("team");

const showButton = document.getElementById("showButton");
showButton.addEventListener("click", showBios);

const vrBio = document.createElement("p");
const wlBio = document.createElement("p");
const ljBio = document.createElement("p");
const nlBio = document.createElement("p");

vrBio.classList.add("expand-bio");
wlBio.classList.add("expand-bio");
ljBio.classList.add("expand-bio");
nlBio.classList.add("expand-bio");

vrBio.innerHTML = "Viral Rathod: I am a sophomore that is familiar with frontend development and have worked with web applications as well as several mobile apps. I am interested in working with the user experience but able to contribute to the backend as well.";
wlBio.innerHTML = "Wanqi Li: Hello, I'm a Junior at Umass Amherst. My interest lies in computer systems and databases. I'm looking forward to learning how to incorporate databases into web applications to serve as the backend. ";
ljBio.innerHTML = "Lijiang Jiang: I am interested in art, and I have learned a little about human-computer interaction, and I may be able to contribute to the UI design of this project.";
nlBio.innerHTML = "Nehal Linganur: I am a senior and my majors are informatics and psychology. I have knowledge about HCI and HTML and CSS and I’m looking forward to gain more experience in working with the backend. I have some knowledge about user experiences and design which I think I can contribute to this project. ";

const hideButton = document.createElement("button");
hideButton.innerHTML = "Hide";
hideButton.addEventListener("click", hideBios);

function showBios(){
    teamSection.appendChild(vrBio);
    teamSection.appendChild(wlBio);
    teamSection.appendChild(ljBio);
    teamSection.appendChild(nlBio);

    teamSection.appendChild(hideButton);
}

function hideBios(){
    teamSection.removeChild(vrBio);
    teamSection.removeChild(wlBio);
    teamSection.removeChild(ljBio);
    teamSection.removeChild(nlBio);

    teamSection.removeChild(hideButton);
}


const overview = document.getElementById('overview');
const application = document.getElementById('application-parts');
const data = document.getElementById('data-requirements');
const wireframes = document.getElementById('wire-frames');
const real = document.getElementById('real-world');
const IE = document.getElementById('IE');


function count(element){
    let inner = element.innerHTML;

    inner = inner.substring(inner.indexOf('<p>')+3, inner.indexOf('</p>'));
    const regex = /<[^>]*>/g;
    inner = inner.replace(regex, "");
    //console.log(inner);
    inner = inner.split(' ');
    let count = inner.length;
    element.appendChild(document.createElement('p')).innerHTML = `Word Count: ${count}`;
}
function removeEventListener(element){
   // console.log(element.lastChild)
    element.removeChild(element.lastChild)
}
overview.addEventListener('mouseover',()=>{count(overview)});
overview.addEventListener('mouseout',()=>{removeEventListener(overview)});
application.addEventListener('mouseover',()=>{count(application)});
application.addEventListener('mouseout',()=>{removeEventListener(application)});
data.addEventListener('mouseover',()=>{count(data)});
data.addEventListener('mouseout',()=>{removeEventListener(data)});
wireframes.addEventListener('mouseover',()=>{count(wireframes)});
wireframes.addEventListener('mouseout',()=>{removeEventListener(wireframes)});
real.addEventListener('mouseover',()=>{count(real)});
real.addEventListener('mouseout',()=>{removeEventListener(real)});
IE.addEventListener('mouseover',()=>{count(IE)});
IE.addEventListener('mouseout',()=>{removeEventListener(IE)});

