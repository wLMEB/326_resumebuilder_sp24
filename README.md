
# ResuMate

ResuMate: A web application that helps users quickly generate multiple resumes that meet different requirements, providing a variety of templates for users to choose from, helping users easily and conveniently generate different resumes for use in different scenarios.

## Project Structure

For src/docs/milestone-01 folder we have:
- assets folder: Contain picture we need use.

- index.html: Create the html file of this describe document.

- script.js: Content of the describe document.

- styles.css：Style of the describe document.

For src/client/milestone-02 folder we have: 
- assets folder: Contain picture we need use.

- db.js: Contain all the functions about database. We have function to add, get, delete information block with database there. 

- download.js: Create the download page.

- generator.js: Opens a new window and builds a resume in it.

- index.html: Create the html file of this project.

- info.js: Create the page to input user information.

- main.js: Display the requested view by viewId.

- styles.css: Style of our web page.

- temp.js: Create the page to select information fields and template.

- template1.css: Style of our first template.

- template2.css: Style of our Second template.

For src/server/milestone-03 folder we have: 
- db.js: Provides a set of functions for interacting with a database. It exports five asynchronous functions: addInfo, getInfo, deleteInfo, updateInfo, and getAllInfo, to add, get, delete and update information block.

- functions.js: Provides a set of asynchronous functions for interacting with a database. This module depends on a db.js module for database operations. 

- index.js: The file work with function in the function.js that creates the server and then responds to different requests.

## Setup Instructions
clone repository

npm start

## Documentation
- First, use *npm run milestone-02* to open the web window.
- Second, in the main page we can click *Build resume* button to start building a resume or click *Access resume* to skip the input information page, directly start to build a resume with the information we submitted in the past.
- Third, after click *Build resume* button, we will be navigated to the information page to write our information that we want to use in a resume. In this page we also have *Add Experience* and *Remove Experience* button to add and remove experience, if we want to use more than one experience. After we fill our information we can click *Submit* button to save our information and go to the next page or click *Back* button to return to the main page.
- Fourth, after click *Submit* button, we will be navigated to information and template select page to select the information and template we want to use to build the resume. We can use *select* button to choose what we want to use and *deselect* button to deselect what we do not want to use. When finish choosing, we can use *Confirm* button to navigate to download page, or use *Back* button to return to the information page.
- Fifth, after be navigated to download page we can use *Preview* button to check the resume will be created and than click *Download* button to download the resume, it will open a new window to download the resume. Or, we can click *Back* button to return to the information and template select page.
