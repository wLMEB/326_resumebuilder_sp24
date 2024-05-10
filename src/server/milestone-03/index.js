import express from "express";
import logger from "morgan";
import {load, add, update, remove, displayAll} from "./functions.js";


const app = express();
const port = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/client/milestone-02"));
/**
 * This asynchronous function is a middleware that handles methods not allowed by sending a 405 status code and a plain text message 'Method Not Allowed'.
 * 
 * @async
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {Promise<void>} A Promise that resolves when the response has been sent.
 */
const MethodNotAllowedHandler = async (request, response) => {
    response.status(405).type('text/plain').send('Method Not Allowed'); // you should change this!
};

app
  .route("/load")
  .get(async (request, response) => {
    console.log("GET /read");
    const fieldname = request.query.fieldname;
    await load(response, fieldname);
  })
  .all(MethodNotAllowedHandler);
  app
  .route("/add")
  .post(async (request, response) => {
    console.log("POST /add");
    const fieldname = request.query.fieldname;
    const value = request.query.value;
    add(response, fieldname, value);
  })
  .all(MethodNotAllowedHandler);
  app
  .route("/update")
  .put(async (request, response) => {
    console.log("PUT /update");
    const fieldname = request.query.fieldname;
    const value = request.query.value;
    update(response, fieldname, value);
  })
  .all(MethodNotAllowedHandler);
  app
  .route("/remove")
  .delete(async (request, response) => {
    console.log("DELETE /remove");
    const fieldname = request.query.fieldname;
    remove(response, fieldname);
  })
  .all(MethodNotAllowedHandler);
  app
  .route("/displayAll")
  .get(async (request, response) => {
    console.log("GET /displayAll");
    displayAll(response);
  })
  .all(MethodNotAllowedHandler);

  app.route("*").all(async (request, response) => {
    response.status(404).send(`404 Not found: ${request.path}`);
  });
  
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });