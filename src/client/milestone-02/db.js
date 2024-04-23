
// import PouchDB from "pouchdb";

const db = new PouchDB("counters");

/**
 *  This asynchronously function adds a new information set to the database with the provided fieldname as the _id and the provided value as value.
 * 
 * @async
 * @param {string} fieldname - The fieldname that will be used as the _id of the new document.
 * @param {string} value - The value that will be stored in the 'value' field of the new document.
 * @returns {Promise<void>} - A promise that resolves when the information has been successfully saved.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function addInfo(fieldname, value){
    console.log(fieldname,value)
    await db.put({
        _id: fieldname,
        value: value
    });
}

export async function getInfo(fieldname){
    const doc = await db.get(fieldname);
    return doc.value;
}

export async function deleteInfo(fieldname){
    const doc = await db.get(fieldname);
    await db.remove(doc);
}