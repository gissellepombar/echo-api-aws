import {dbConnect} from "./dbConnect.js";
import { mongoCredentials } from "../service_account.js";

const collectionName = mongoCredentials.COLLECTION;

//Get: Get All
export async function getAllDoc(req, res) {
    const db = dbConnect();
    const collection = await db.collection(collectionName).find({}).limit(10).toArray();
    
    console.table(collection);
    res.send(collection);
}

//Get: Get One 
export async function getOneDeck(req, res) {
    
    const { docId } = req.params;
    const db = dbConnect();
    const collection = await db.collection(collectionName).find({ docId }).toArray();

    console.table(collection);
    res.send(collection);
}

//Post: Doc
export async function postDoc(req, res) {
    const newDoc = req.body
    const db = dbConnect();
    await db.collection(collectionName).insertOne(newDoc)
        .catch(err => {
            res.status(500).send(err)
            return
        })
        res.status(201).send( {message: 'New Doc Inserted'});
}

//Delete: Delete Doc by ID
export async function deleteDeck(req, res) {
    // const searchParam = { id: Number(req.params.docId) }
    const { docId } = req.params
    const db = dbConnect();
    await db.collection(collectionName).deleteOne( {docId} )

    // const docId = req.params.id; // assumes the ID is passed as a URL parameter
    // await db.collection(collectionName).deleteOne({ _id: ObjectId(docId) })
        .catch(err => {
            res.status(500).send(err)
            return
        })
        res.status(201).send( {message: 'Doc Deleted'});
}



