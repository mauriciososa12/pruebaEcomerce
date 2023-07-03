import mongoose from "mongoose";
import bcrypt from "bcrypt";


const Schema = mongoose.Schema;


const userSchema = new Schema({

    first_name: String,
    last_name: String,
    zona: String,
    social: String,

    email: {
        type: String,
        unique: true
    },
    password: String,

    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    },

    role: {
        type: String,
        enum: ['USER', 'PREMIUM', 'ADMIN'],
        default: "USER",
    },
    documents: [

        {

            name: String,
            reference: String,

        },
    ],

    last_connection: {

        type: Date,
        default: Date.now,

    },


    default: [],

},);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword);
};



const userModel = mongoose.model("users", userSchema);

export default userModel;


