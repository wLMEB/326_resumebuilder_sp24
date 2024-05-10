import * as db from "./db.js";

const headerFields = { "Content-Type": "text/html" };

/**
 * This asynchronous function attempts to load information from the database using a given fieldname.
 * 
 * If the operation is successful, it writes the information to the response with a status code of 200.
 * 
 * If the operation fails, it writes an error message to the response with a status code of 404.
 * 
 * @async
 * @param {object} response - The response object to write to.
 * @param {string} fieldname - The name of the field to load information from.
 * @returns {Promise<void>} A Promise that resolves when the operation has completed.
 */
export async function load(response, fieldname){
    try {
        const info = await db.getInfo(fieldname);
        response.writeHead(200, headerFields);
        response.write(JSON.stringify(info));
        response.end();
      } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`Failed to load from ${fieldname}`);
        response.end();
      }

}

/**
 * This asynchronous function attempts to add information to the database using a given fieldname and value.
 * 
 * If the operation is successful, it writes a success message to the response with a status code of 200.
 * 
 * If the operation fails, it writes an error message to the response with a status code of 404.
 * 
 * @async
 * @param {object} response - The response object to write to.
 * @param {string} fieldname - The name of the field to save information to.
 * @param {string} value - The value to save in the field.
 * @returns {Promise<void>} A Promise that resolves when the operation has completed.
 */
export async function add(response, fieldname, value){
    try {
        const info = await db.addInfo(fieldname, value);
        response.writeHead(200, headerFields);
        response.write("success");
        response.end();
      } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`Failed to add ${fieldname} with value ${value} to database; message: ${err}`);
        response.end();
      }

}

/**
 * This asynchronous function attempts to update a field in the database with a value.
 * 
 * If the operation is successful, it writes a success message to the response with a status code of 200.
 * 
 * If the operation fails, it writes an error message to the response with a status code of 404.
 * 
 * @async
 * @param {object} response - The response object to write to.
 * @param {string} fieldname - The name of the field to update.
 * @param {any} value - The new value to set for the field.
 * @returns {Promise<void>} A Promise that resolves when the operation has completed.
 */
export async function update(response, fieldname, value){
    try {
        const info = await db.updateInfo(fieldname, value);
        response.writeHead(200, headerFields);
        response.write("success");
        response.end();
      } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`Failed to update ${fieldname} with new value ${value} to database; message: ${err}`);
        response.end();
      }

}

/**
 * This asynchronous function attempts to remove a field from the database.
 * 
 * If the operation is successful, it writes a success message to the response with a status code of 200.
 * 
 * If the operation fails, it writes an error message to the response with a status code of 404.
 * 
 * @async
 * @param {object} response - The response object to write to.
 * @param {string} fieldname - The name of the field to remove.
 * @returns {Promise<void>} A Promise that resolves when the operation has completed.
 */
export async function remove(response, fieldname){
    try {
        const info = await db.deleteInfo(fieldname);
        response.writeHead(200, headerFields);
        response.write("success");
        response.end();
      } catch (err) {
        response.writeHead(404, headerFields);
        response.write(`Failed to delete ${fieldname}; message: ${err}`);
        response.end();
      }

}

/**
 * This asynchronous function attempts to load all information from the database.
 * 
 * If the operation is successful, it writes the information to the response with a status code of 200.
 * 
 * If the operation fails, it writes an error message to the response with a status code of 404.
 * 
 * @async
 * @param {object} response - The response object to write to.
 * @returns {Promise<void>} A Promise that resolves when the operation has completed.
 */
export async function displayAll(response){
    try {
       // console.log(response)
        const info = await db.getAllInfo();
        console.log(info)
        response.writeHead(200, headerFields);
        response.write(JSON.stringify(info));
        response.end();
      } catch (err) {
        console.log(err)
        console.log("end of error")
        response.writeHead(404, headerFields);
        response.write(`Failed load all information from database; message: ${err}  `);
        response.end();
      }

}