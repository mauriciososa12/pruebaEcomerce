import dotenv from 'dotenv';

dotenv.config();

// Variables de entorno

export default {

    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
    MONGO_SECRET: process.env.MONGO_SECRET,

    PRIVATE_KEY: process.env.PRIVATE_KEY,
    COOKIE_NAME: process.env.COOKIE_NAME,
    COOKIE_SECRET: process.env.COOKIE_SECRET,

    GITHUB_CIENT_ID: process.env.GITHUB_CIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACKURL: process.env.GITHUB_CALLBACKURL,


}