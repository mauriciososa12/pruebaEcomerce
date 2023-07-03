import mongoose from "mongoose";


const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({

     User: String,
     Message: String,



})

export const messageModel = mongoose.model(messageCollection, messageSchema)

