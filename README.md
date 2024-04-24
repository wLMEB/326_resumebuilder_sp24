
# ResuMate

ResuMate: A web application that helps users quickly generate multiple resumes that meet different requirements, providing a variety of templates for users to choose from, helping users easily and conveniently generate different resumes for use in different scenarios.

## Project Structure

For src/client/milestone-02 we have: 
- assets folder: Contain picture we need use.

- db.js: Contain all the functions about database. We have function to add, get, delect information block with database there. 

- download.js: Create the download page.

- generator.js: Opens a new window and builds a resume in it.

- index.html: Create the html file of this project.

- info.js: Create the page to input user information.

- main.js: Display the requested view by viewId.

- mockData.js: Create mock data for this project.

- styles.css: Style of our web page.

- temp.js: Create the page to select information fields and template.

- template1.css: Style of our first template.


## Setup Instructions
npm run milestone-02

## Documentation
- First, use *npm run milestone-02* to open the web window.
- Second, in the main page we can click *Build resume* botton to start building a resume or click *Access resume* to skip the input information page, directly start to build a resume with the information we submit in the past.
- Third, after click *Build resume* botton, we will be navigated to information page to write our information that we want to use in resume. In this page we also have *Add Experience* and *Remove Experience* botton to add and remove experience, if we want to use more than one experience. After we fill our information we can click *Submit* botton to save our information and go to the next page or click *Back* botton to return to the main page.
- Fourth, after click *Submit* botton, we will be navigated to information and template select page to select the information and template we want to use to build the resume. We can use *select* botton to choose what we want to use and *deselect* botton to deselect what we do not want to use. When finish choosing, we can use *Comfirm* botton to navigate to download page, or use *Back* botton to return to the information page.
- Fifth, after be navigated to download page we can use *Preview* botton to check the resume will be created and than click *Download* botton to download the resume, it will open a new window to download the resume. Or, we can click *Back* botton to return to the information and template select page.
