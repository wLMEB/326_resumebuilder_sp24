import { navigate } from "./main.js";
import { render as infoRender, fields } from "./info.js";

import { render as downloadRender } from "./download.js";
import * as db from "./db.js";

const content = document.getElementById("templateView");
let selectedStyle = 1;

async function render() {
  content.innerHTML = "<h2>Select your information and a template!</h2><p>Choose what you want to be included in your resume by hitting the select buttons. We have several hand-crafted professional resume templates ready for you to choose! Simply select any one of them, and continue to finalize your resume.</p><p>Information can also be modified below, changes are<b>this generation ONLY</b>unless the update button is pressed.</p>";
  content.appendChild(document.createElement("br"));
  let infoHeader = document.createElement('h3')
  infoHeader.innerText = "Choose your info"
  content.appendChild(infoHeader)
  await showInformations();
  let tempHeader = document.createElement('h3')
  tempHeader.innerText = "Choose your template"
  content.appendChild(tempHeader)
  showTemplate();
  addButton("Back", "infoView", infoRender);
  addButton("Confirm", "downloadView", downloadRender);
}

function addButton(name, page, ren) {
  const button = document.createElement('button');
  button.classList.add("btn", "btn-outline-secondary");
  button.innerText = `${name}`;
  content.appendChild(button);
  button.addEventListener("click", () => {
    ren();
    navigate(`${page}`);
  });
}

async function showInformations() {
  const list = document.createElement("ol");
  content.appendChild(list);
  let allFields = null;
  try {
    const response = await fetch(`/displayAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    allFields = await response.json();
    console.log(allFields);
  } catch (err) {
    console.log(err);
  }
  for (let field of allFields) {
    const item = document.createElement("li");
    try {
      item.innerText = `${field._id}: `;
      const input = document.createElement("input");
      try {
        const response = await fetch(`/load?fieldname=${field._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        input.value = await response.json();
      } catch (err) {
        console.log(err);
      }
      input.id = `${field._id}value`;
      item.appendChild(input);
    } catch (err) {
      continue;
    }
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`/remove?fieldname=${field._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        item.remove();
      } catch (err) {
        console.log(err);
      }
      try {
        await db.deleteInfo(field._id);
      } catch (err) {
        // have not been selected to front end, ignored
      }
    });
    const editButton = document.createElement("button");
    editButton.innerText = "update";
    editButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`/update?fieldname=${field._id}&value=${document.getElementById(`${field._id}value`).value}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.log(err);
      }
      try {
        await db.updateInfo(field._id, document.getElementById(`${field._id}value`).value);
      } catch (err) {
        // data not selected, ignored
      }
    });
    const selectButton = document.createElement("button");
    selectButton.innerText = "select";
    selectButton.addEventListener("click", async () => {
      field.value = document.getElementById(`${field._id}value`).value;
      try {
        await db.addInfo(field._id, document.getElementById(`${field._id}value`).value);
      } catch (err) {
        await db.updateInfo(field._id, document.getElementById(`${field._id}value`).value);
      }
      item.replaceChild(deselectButton, selectButton);
    });
    const deselectButton = document.createElement("button");
    deselectButton.innerText = "deselect";
    deselectButton.addEventListener("click", async () => {
      try {
        await db.deleteInfo(field._id);
      } catch (err) {
        console.log(err);
        console.log("item doesn't exist in the database")
      }
      item.replaceChild(selectButton, deselectButton);
    });
    item.appendChild(document.createElement("br"));
    item.appendChild(editButton);
    item.appendChild(deleteButton);
    
    // Check if the field is already selected
    try {
      await db.getInfo(field._id);
      item.appendChild(deselectButton);
    } catch (err) {
      item.appendChild(selectButton);
    }
    
    list.appendChild(item);
  }
}

function showTemplate() {
  let tempCount = 2;
  const container = document.createElement('div');
  for (let i = 1; i <= tempCount; i++) {
    const temp = document.createElement('div')
    const t = document.createElement('img')
    const tselect = document.createElement("button");
    tselect.id = i;
    tselect.innerText = "select";
    tselect.addEventListener("click", () => {
      selectedStyle = i;
      document.getElementById("curSelect").innerText = `Current template selection: ${selectedStyle}`;
    })
    t.src = `../assets/t${i}img.png`;
    t.innerText = "embed image here"
    t.classList.add("templateImage")
    temp.appendChild(t);
    temp.appendChild(tselect)
    container.appendChild(temp)
    content.appendChild(container)
  }
  const currentSelection = document.createElement('div')
  currentSelection.innerText = `Current template selection: ${selectedStyle}`;
  currentSelection.id = "curSelect"
  container.appendChild(currentSelection)
}

function getSelectedStyle() {
  return selectedStyle;
}

export { render, getSelectedStyle };