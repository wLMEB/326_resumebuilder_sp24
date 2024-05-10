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
  "Massachusetts Institute of Technology",
  "Harvard University",
  "Stanford University",
  "Cornell University",
  "University of California, Berkeley",
  "University of Michigan",
  "University of Washington",
  "Columbia University in the City of New York",
  "University of Pennsylvania",
  "Yale University",
  "University of Wisconsin-Madison",
  "University of California, Los Angeles",
  "The University of Texas at Austin",
  "Princeton University",
  "Purdue University",
  "University of Chicago",
  "University of Toronto",
  "New York University",
  "University of Minnesota Twin Cities",
  "Johns Hopkins University",
  "University of California, San Diego",
  "Carnegie Mellon University",
  "Michigan State University",
  "Penn State University",
  "University of Southern California",
  "University of California, Davis",
  "University of North Carolina at Chapel Hill",
  "Duke University",
  "The University of British Columbia",
  "University of Florida",
  "Rutgers, The State University of New Jersey",
  "University of Illinois Urbana-Champaign",
  "Arizona State University",
  "University of Maryland",
  "University of Virginia",
  "The University of Arizona",
  "University of Colorado Boulder",
  "Texas A&M University",
  "Northwestern University",
  "The Ohio State University",
  "University of California, Irvine",
  "Boston University",
  "Indiana University Bloomington",
  "North Carolina State University",
  "The University of Utah",
  "McGill University",
  "University of Pittsburgh",
  "Tufts University",
  "Georgetown University",
  "Washington University in St. Louis",
  "University of Nebraska-Lincoln",
  "Virginia Polytechnic Institute and State University",
  "University of California, Santa Barbara",
  "Georgia Institute of Technology",
  "University of Rochester",
  "Brown University",
  "California Institute of Technology",
  "Brigham Young University",
  "University of Georgia",
  "University of Alberta",
  "Iowa State University",
  "University of Iowa",
  "University of Massachusetts Amherst",
  "Oregon State University",
  "University of Waterloo",
  "Simon Fraser University",
  "George Washington University",
  "George Mason University",
  "Vanderbilt University",
  "Washington State University",
  "University at Buffalo, State University of New York",
  "Syracuse University",
  "University of South Florida",
  "Colorado State University",
  "University of Notre Dame",
  "University of California, San Francisco",
  "Dartmouth College",
  "Florida State University",
  "Rice University",
  "University of Oregon",
  "University of California, Santa Cruz",
  "University of Connecticut",
  "Emory University",
  "University of Houston",
  "University of Illinois Chicago",
  "University of Kentucky",
  "University of California, Riverside",
  "University of Delaware",
  "Georgia State University",
  "Northeastern University",
  "York University",
  "University of Kansas",
  "University of Missouri",
  "Western University",
  "Université de Montréal",
  "The University of Tennessee, Knoxville",
  "University of New Mexico",
  "University of Central Florida",
  "Rochester Institute of Technology",
  "University of Miami",
  "University of South Carolina",
  "McMaster University",
  "Boston College",
  "University of Victoria",
  "Louisiana State University",
  "Toronto Metropolitan University",
  "Temple University",
  "University of North Texas",
  "Queen's University",
  "Clemson University",
  "University of New Hampshire",
  "Fordham University",
  "Drexel University",
  "San Diego State University",
  "Florida International University",
  "Université Laval",
  "The University of Oklahoma",
  "American University",
  "The University of Alabama",
  "University of Cincinnati",
  "University of Vermont",
  "Case Western Reserve University",
  "Virginia Commonwealth University",
  "Utah State University",
  "Rensselaer Polytechnic Institute",
  "Oklahoma State University",
  "The University of Tennessee at Martin",
  "Carleton University",
  "Baylor University",
  "West Virginia University",
  "Auburn University",
  "University of Maryland, Baltimore County",
  "University of Ottawa",
  "University of Guelph",
  "Stony Brook University",
  "University of Alabama at Birmingham",
  "Tulane University",
  "Portland State University",
  "Wayne State University",
  "California State University, Northridge",
  "Concordia University",
  "Dalhousie University",
  "San José State University",
  "University of Wisconsin-Milwaukee",
  "University at Albany, State University of New York",
  "University of Saskatchewan",
  "University of Arkansas",
  "San Francisco State University",
  "Brandeis University",
  "Southern Methodist University",
  "Kent State University",
  "University of Nevada, Reno",
  "Mississippi State University",
  "The University of Texas at Dallas",
  "University of Manitoba",
  "Texas Tech University",
  "Northern Illinois University",
  "College of William & Mary",
  "Kansas State University",
  "Indiana University-Purdue University Indianapolis",
  "Marquette University",
  "Michigan Technological University",
  "University of North Carolina at Charlotte",
  "Northern Arizona University",
  "University of Rhode Island",
  "University of Denver",
  "University of Idaho",
  "United States Military Academy",
  "Loyola University Chicago",
  "Santa Clara University",
  "Florida Atlantic University",
  "New Mexico State University",
  "University of Nevada, Las Vegas",
  "Montana State University",
  "Binghamton University, State University of New York",
  "Quinnipiac University",
  "Université du Québec à Montréal",
  "Liberty University",
  "University of Wyoming",
  "DePaul University",
  "The University of Texas MD Anderson Cancer Center",
  "Oregon Health & Science University",
  "California Polytechnic State University, San Luis Obispo",
  "Western Michigan University",
  "Swarthmore College",
  "The New School",
  "Bowling Green State University",
  "Middle Tennessee State University",
  "University of Missouri-Kansas City",
  "Lehigh University",
  "Memorial University of Newfoundland",
  "The University of Maine",
  "Saint Louis University",
  "University of Mississippi",
  "Wake Forest University",
  "University of Montana",
  "University of Louisville",
  "Illinois Institute of Technology",
  "California State University, Fullerton"
];
const majorOptions = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Biology",
  "Physics",
];
const degreeOptions = ["Bachelor's", "Master's", "PhD", ""];

let type = "Personal";
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
      if(option ===""){
        optionElement.selected = true;
      }
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
 console.log(type,fieldName);
  field.id = `${type}-${fieldName}`;
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
        break;
  }

  

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
    // console.log(inputs);
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
  const subHeader = document.createElement("h4");
  subHeader.innerText = "If you want to input multiple experience, make sure to adjust the number of experience by the buttons first before adding any information.";
  content.appendChild(subHeader);
  content.appendChild(header);
}

/**
 * This function creates two buttons: "Add Experience" and "Remove Experience". 
 * The "Add Experience" button, when clicked, increments the 'numExperience' variable and calls the 'render' function.
 * The "Remove Experience" button, when clicked, checks if 'numExperience' is greater than 0. If it is, it decrements 'numExperience' and calls the 'render' function.
 * Both buttons are appended to the 'content' element.
 * 
 * @returns {void} This function does not return anything.
 */
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
  addButton("Back", "landingView", () => null);
  addRemoveExperienceButtons();
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
  console.log(inputs);
  inputs.forEach((input) => values.push(input.value));
  console.log(values);
  for (let i = 0; i < inputs.length; i++) {
    if (values[i] != "") {
      try {
        //await db.addInfo(inputs[i].id, values[i]);
        const response = await fetch(`/add?fieldname=${inputs[i].id}&value=${values[i]}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        console.log(err);
        alert("Already exists information for the same field, please delete or edit the existing information first then add new information"); 
      }
    }
  }
}

export { render };
