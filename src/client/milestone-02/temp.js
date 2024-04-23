import { navigate } from "./main.js";
import { render as infoRender, fields } from "./info.js";

import { render as downloadRender } from "./download.js";
import * as db from "./db.js";

const content = document.getElementById("templateView");

export let selectedFields = [];

function render() {
  //render function called by other pages to render this page
  content.innerHTML = "";
  content.textContent =
    "to be implemented for selecting templates, select button is temporatay for navigating through pages";
  content.appendChild(document.createElement("br"));

  showInfomations();
  addButton("back", "infoView", infoRender);
  addButton("select", "downloadView", downloadRender);
}

function addButton(name, page, ren) {
  // Generate button dynamically and set their event listeners
  const button = document.createElement("button"); // to navigate to the requested page
  button.innerText = `${name}`;
  content.appendChild(button);
  button.addEventListener("click", () => {
    ren();
    navigate(`${page}`);
  });
}

async function showInfomations() {
  const list = document.createElement("ol");
  content.appendChild(list);
  for (let field of fields) {
    const item = document.createElement("li");
    try {
      item.innerText = `${field}: ${await db.getInfo(field)}`;
    } catch (err) {
      //item.innerText = `${field}: `;
      continue;
    }

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", async () => {
      try {
        await db.deleteInfo(field);
        item.remove();
      } catch (err) {
        console.log(err);
      }
    });

    const selectButton = document.createElement("button");
    selectButton.innerText = "select";
    selectButton.addEventListener("click", ()=>{
        selectedFields.push(field);
    })
    item.appendChild(deleteButton);
    item.appendChild(selectButton);
    list.appendChild(item);
  }
}

function getSelectedFields() {
  return selectedFields;
}
export { render, getSelectedFields };
