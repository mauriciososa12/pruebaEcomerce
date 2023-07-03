import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartsCollection = 'carts';


const cartSchema = new Schema({
     products: [
          {
               product: { type: Schema.Types.ObjectId, ref: "products" },
               quantity: {
                    type: Number,
                    default: 1,

               },
          },
     ],

     default: []

});


export const cartsModel = mongoose.model(cartsCollection, cartSchema)