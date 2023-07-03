import { fileURLToPath } from 'url'
import { dirname } from 'path'
import MongoStore from "connect-mongo";
import config from './config/credentials.js';
//import multer from 'multer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname


/// Session

export const MongoStoreInstance = {

    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        dbName: config.DB_NAME,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },

        ttl: 200

    }),
    secret: config.MONGO_SECRET,
    resave: true,
    saveUninitialized: false


}


export const generateCode = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};