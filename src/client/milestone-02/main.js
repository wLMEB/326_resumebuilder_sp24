import { render as infoRender} from "./info.js" ;
console.log("open js");

function navigate(viewId) {
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
    createButton.addEventListener("click", () => {
      navigate("infoView");
      infoRender();
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
