
 import PouchDB from "pouchdb";

const db = new PouchDB("counters");

/**
 *  This asynchronously function adds a new information block to the database with the provided fieldname as the _id and the provided value as value.
 * 
 * @async
 * @param {string} fieldname - The fieldname that will be used as the _id of the information block.
 * @param {string} value - The value that will be stored in the 'value' field of the new information block.
 * @returns {Promise<void>} - A promise that resolves when the information block has been successfully saved.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function addInfo(fieldname, value){
    console.log(fieldname,value)
    await db.put({
        _id: fieldname,
        value: value
    });
}

/**
 * This function retrieves a information block from the database using the provided fieldname as the _id.
 * 
 * @async
 * @param {string} fieldname - The fieldname that will be used as the _id of the information block to retrieve information block.
 * @returns {Promise<any>}  - A promise that resolves when the information block has been successfully got.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function getInfo(fieldname){
    const doc = await db.get(fieldname);
    return doc.value;
}

/**
 * This function deletes a information block from the database using the provided fieldname as the _id.
 * 
 * @async
 * @param {string} fieldname - The fieldname that will be used as the _id of the information block to delete information block.
 * @returns {Promise<void>}  - A promise that resolves when the information block has been successfully deleted.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function deleteInfo(fieldname){
    const doc = await db.get(fieldname);
    await db.remove(doc);
}

export async function updateInfo(fieldname, value){
    
    const doc = await db.get(fieldname);
    doc.value = value;
    await db.put(doc);
    // return doc
}

/**
 * This function retrieves all information block from the database.
 * 
 * @async
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of information blocks.
 * @throws {Error} - Throws an error if there is a problem accessing the database.
 */
export async function getAllInfo(){
    const allDocs = await db.allDocs({include_docs: true});
    return allDocs.rows.map((row) => row.doc);
}