import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Nombre de la colección
const productCollection = 'products'

// Como se guardan los datos en esta colección // Esquema del documento

const productSchema = new mongoose.Schema({

    title: String,
    id: Number,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    status: Boolean,
    stock: {
        type: Number,
        index: true,

    },
    category: {
        type: String,
        index: true,

    },
    owner: {

        type: mongoose.Schema.Types.ObjectId,
        default: "ADMIN",
    },


})



productSchema.plugin(mongoosePaginate);

// Creación del model : collection + schema 

export const productModel = mongoose.model(productCollection, productSchema)

