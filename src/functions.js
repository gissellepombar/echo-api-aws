import {dbConnect} from "./dbConnect.js";
import { mongoCredentials } from "../service_account.js";
import { ObjectId } from "mongodb";

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
    
    const { deckId } = req.params;
    const db = dbConnect();
    const collection = await db.collection(collectionName).findOne({_id: new ObjectId(deckId)})
    .catch(err => {
        res.status(500).send(err)
        return
    })
    res.status(201).send(collection);
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
    const { deckId } = req.params
    const db = dbConnect();
    await db.collection(collectionName).deleteOne({ _id: new ObjectId(deckId) })
        .catch(err => {
            res.status(500).send(err)
            return
        })
        res.status(201).send( {message: 'Doc Deleted'});
}

  export async function updateRanking(req, res) {
    const { deckId, cardIndex } = req.params
    const { ranking } = req.body
    const db = dbConnect()
    const collection = db.collection(collectionName);
    await collection.updateOne(
      { _id: new ObjectId(deckId) },
      { $set: { [`formData.rating${cardIndex}`]: ranking } }
    );
    res.status(200).send({ message: 'Card ranking updated successfully.' });
  };
