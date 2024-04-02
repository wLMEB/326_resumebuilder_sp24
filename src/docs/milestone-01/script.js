const teamSection = document.getElementById("team");

const showButton = document.getElementById("showButton");
showButton.addEventListener("click", showBios);

const vrBio = document.createElement("p");
const wlBio = document.createElement("p");
const ljBio = document.createElement("p");
const nlBio = document.createElement("p");

// vrBio.classList.add("expand-bio");
// wlBio.classList.add("expand-bio");
// ljBio.classList.add("expand-bio");
// nlBio.classList.add("expand-bio");

vrBio.innerHTML = "Viral Rathod: I am a sophomore that is familiar with frontend development and have worked with web applications as well as several mobile apps. I am interested in working with the user experience but able to contribute to the backend as well.";
wlBio.innerHTML = "Wanqi Li: Hello, I'm a Junior at Umass Amherst. My interest lies in computer systems and databases. I'm looking forward to learning how to incorporate databases into web applications to serve as the backend. ";
ljBio.innerHTML = "Lijiang Jiang: I am interested in art, and I have learned a little about human-computer interaction, and I may be able to contribute to the UI design of this project.";
nlBio.innerHTML = "Nehal Linganur: TBD";

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


