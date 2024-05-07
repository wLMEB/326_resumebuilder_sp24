import * as db from "./db.js";

const headerFields = { "Content-Type": "text/html" };

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