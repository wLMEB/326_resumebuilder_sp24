import { render as infoRender} from "./info.js" ;

function navigate(viewId) { // display the requested view by viewId
  // Hide all views
  document.querySelectorAll(".view").forEach((view) => {
    view.style.display = "none";
  });

  // Show the requested view
  document.getElementById(viewId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  // with every instance DOM content loaded
  // Initialize with the landing view page
  navigate("landingView");

  const createButton = document.getElementById("create");
  if (createButton) {
    createButton.addEventListener("click", () => { //add event listener to
      navigate("infoView");                       //navigate to information view
      infoRender();                               //information page renders dynamically 
      console.log("Create button clicked");
    });
  }

  const loadButton = document.getElementById("load");
  if (loadButton) {
    loadButton.addEventListener("click", () => {
      navigate("infoView");
      infoRender();
      console.log("Load button clicked");
    });
  }


});


export { navigate };
