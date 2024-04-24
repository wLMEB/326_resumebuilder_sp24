import { render as infoRender} from "./info.js" ;
import { render as downloadRender} from "./download.js";
import { render as tempRender } from "./temp.js";

function navigate(viewId) { // display the requested view by viewId
  // Hide all views
  document.querySelectorAll(".view").forEach((view) => {
    view.style.display = "none";
  });

  switch (viewId){
    case "infoView":
      infoRender();
      break;
    case "downloadView":
      downloadRender();
      break;
    case "templateView":
      tempRender();
  }

  // Show the requested view
  document.getElementById(viewId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  // with every instance DOM content loaded
  // Initialize with the landing view page
  navigate("landingView");

  document.querySelectorAll('.nav-link, .navbar-brand').forEach(link => {
    link.addEventListener('click', function(event) {
      // Get viewId from href and call navigate with it
      const viewId = this.getAttribute('href').substring(1);
      navigate(viewId);
    });
  });

  const createButton = document.getElementById("create");
  if (createButton) {
    createButton.addEventListener("click", () => { //add event listener to
      navigate("infoView");                       //navigate to information view
      console.log("Create button clicked");
    });
  }

  const loadButton = document.getElementById("load");
  if (loadButton) {
    loadButton.addEventListener("click", () => {
      navigate("templateView");
      console.log("Load button clicked");
    });
  }


});


export { navigate };
