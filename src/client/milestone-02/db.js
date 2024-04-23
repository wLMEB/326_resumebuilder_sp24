
// import PouchDB from "pouchdb";

const db = new PouchDB("counters");


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