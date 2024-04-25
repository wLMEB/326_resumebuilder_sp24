import { navigate } from "./main.js";
import { render as tempRender } from "./temp.js";
import * as db from "./db.js";
const content = document.getElementById("infoView");
// Array of fields to be rendered
export const fields = [
  "Name",
  "Email",
  "Phone Number",
  "School",
  "Start Date",
  "End Date",
  "Degree",
  "Major",
  "Organization",
  "Position",
  "Work Start",
  "Work End",
  "Description",
  "Skills",
];
const schoolOptions = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "Yale University",
];
const majorOptions = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Biology",
  "Physics",
];
const degreeOptions = ["Bachelor's", "Master's", "PhD"];

let type = "";
let numExperience = 0;
/**
 * This function dynamically generates a field with a label and an input element. It also creates a subheader based on the fieldName.
 *
 * @param {string} fieldName - The name of the field to generate. This will be used as the text for the label and to determine the subheader.
 * @returns {void} This function does not return anything.
 */
function fieldGen(fieldName) {
  // Generate each field dynamically
  const fieldLabel = document.createElement("label");
  let field = document.createElement("input");
  const subHeader = document.createElement("h4");

  fieldLabel.innerText = `${fieldName}: `;
  field.classList.add("inputs");

  if (fieldName === "School") {
    field = document.createElement("input");
    field.classList.add("inputs");
    field.setAttribute("list", "schoolOptions");

    const datalist = document.createElement("datalist");
    datalist.id = "schoolOptions";
    schoolOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      datalist.appendChild(optionElement);
    });
    content.appendChild(datalist);
  } else if (fieldName === "Degree") {
    field = document.createElement("select");
    field.classList.add("inputs");
    degreeOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option;
      field.appendChild(optionElement);
    });
  } else if (
    fieldName === "Start Date" ||
    fieldName === "End Date" ||
    fieldName === "Work Start" ||
    fieldName === "Work End"
  ) {
    field = document.createElement("input");
    field.classList.add("inputs");
    field.type = "date";
  } else if (fieldName === "Major") {
    field = document.createElement("input");
    field.classList.add("inputs");
    field.setAttribute("list", "majorOptions");

    const datalist = document.createElement("datalist");
    datalist.id = "majorOptions";
    majorOptions.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      datalist.appendChild(optionElement);
    });
    content.appendChild(datalist);
  } else {
    field = document.createElement("input");
    field.classList.add("inputs");
  }

  content.appendChild(fieldLabel);
  content.appendChild(field);
  content.appendChild(document.createElement("br"));
  switch (fieldName) {
    case "Phone Number":
      type = "Education";
      subHeader.innerText = "Education";
      content.appendChild(subHeader);
      break;
    case "Major":
      type = "Experience";
      subHeader.innerText = "Experience 1";
      content.appendChild(subHeader);
      for (let i = 0; i < numExperience; i++) {
        fieldGen("Organization");
        fieldGen("Position");
        fieldGen("Work Start");
        fieldGen("Work End");
        fieldGen("Description");
      }
      // find the all elements named h4 and change the text of the one that says "Other"
      const h4s = document.querySelectorAll("h4");
      let expCount = 2;
      for (let i = 0; i < h4s.length; i++) {
        // if the text of the h4 contains "Experience", update the number
        if (h4s[i].innerText.includes("Other")) {
          h4s[i].innerText = `Experience ${expCount}`;
          expCount++;
        }
      }

      break;
    case "Description":
      type = "Other";
      subHeader.innerText = "Other";
      content.appendChild(subHeader);
  }

  field.id = `${type}-${fieldName}`;

  // splice the inputs to retrieve only the IDS from 8 til the second last element
    const inputs = document.querySelectorAll(".inputs");
    const ids = [];
    for (let i = 8; i < inputs.length - 1; i++) {
      ids.push(inputs[i].id);
    }
    // // if ids is equal to 5, change the last element to 'Experience-Description'
    // if (ids.length === 5) {
    //   ids[4] = "Experience-Description";
    // }
    // if ids is divisible by 5, edit the ids such that the first 5 elements are the first experience, the next 5 are the second experience, and so on
    if (ids.length % 5 === 0) {
        // change the first 5 elements to be 'Experience-Organization', 'Experience-Position', 'Experience-Work Start', 'Experience-Work End', 'Experience-Description', and the next 5 elements to be 'Experience 2-Organization', 'Experience 2-Position', 'Experience 2-Work Start', 'Experience 2-Work End', 'Experience 2-Description', and so on
        let count = 0;
        for (let i = 0; i < ids.length; i++) {
            if (i % 5 === 0) {
                count++;
            }
            ids[i] = `Experience ${count}-${fields[i % 5 + 8]}`;
        }
    }
    // update inputs ids
    for (let i = 0; i < inputs.length - 1; i++) {
        // first 8 elements are not changed
        if (i >= 8) {
            inputs[i].id = ids[i - 8];
        }
        // change the rest of the elements
        if (i > 8 && i < inputs.length - 2) {
            inputs[i].id = ids[i - 8];
        }
    }
    console.log(inputs);
}

/**
 * This function dynamically generates a button, sets its text, adds it to the content element, and sets its click event listener.
 *
 * @param {string} name - The text that will be displayed on the button.
 * @param {string} page - The page to navigate to when the button is clicked.
 * @param {Function} rend - The function to execute when the button is clicked.
 * @returns {void} This function does not return anything.
 */
function addButton(name, page, rend) {
  // Generate button dynamically and set their event listeners
  const button = document.createElement("button"); // to navigate to the requested page
  button.classList.add("btn", "btn-outline-secondary");
  button.innerText = `${name}`;
  content.appendChild(button);
  button.addEventListener("click", () => {
    rend();
    navigate(`${page}`);
  });
}

/**
 * This function creates an h2 element, sets its text to "Input your information:", and appends it to the content element.
 *
 * @returns {void} This function does not return anything.
 */
function addHeadernText() {
  const header = document.createElement("h2");
  header.innerText = "Input your information:";
  content.appendChild(header);
}

function addRemoveExperienceButtons() {
  const addButton = document.createElement("button");
  addButton.classList.add("btn", "btn-outline-secondary");
  addButton.innerText = "Add Experience";
  addButton.addEventListener("click", () => {
    numExperience++;
    render();
  });

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-outline-secondary");
  removeButton.innerText = "Remove Experience";
  removeButton.addEventListener("click", () => {
    if (numExperience > 0) {
      numExperience--;
      render();
    }
  });
  content.appendChild(addButton);
  content.appendChild(removeButton);
}

/**
 * This function called by other pages to render this page. It clears the content element, adds a header text, generates fields for each field in the 'fields' array, and adds two buttons: "Back" and "Submit".
 *
 * The "Back" button navigates to the 'landingView' when clicked.
 * The "Submit" button stores the data to the database and renders the 'templateView' when clicked.
 *
 * @returns {void} This function does not return anything.
 */
function render() {
  //render function called by other pages to render this page
  content.innerHTML = "";
  addHeadernText();
  fields.forEach((field) => fieldGen(field));
  addRemoveExperienceButtons();
  addButton("Back", "landingView", () => null);
  addButton("Submit", "templateView", () => {
    storingTODB();
    setTimeout(() => {
      tempRender();
    }, 1000);
    //tempRender();
  });
  console.log("Rendered");
}

/**
 * This asynchronous function gets all the input elements with the class 'inputs', stores their values in an array, and adds each non-empty value to the database with the corresponding field name.
 *
 * @async
 * @returns {Promise<void>} A Promise that resolves when all the non-empty values have been added to the database.
 */
async function storingTODB() {
  const inputs = document.querySelectorAll(".inputs");
  let values = [];
  inputs.forEach((input) => values.push(input.value));
  console.log(values);
  for (let i = 0; i < inputs.length; i++) {
    if (values[i] != "") {
      try {
        await db.addInfo(inputs[i].id, values[i]);
      } catch (err) {
        console.log(err);
      }
    }
  }
}

export { render };
