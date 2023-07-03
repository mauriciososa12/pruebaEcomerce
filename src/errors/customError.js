export default class CustomError {
    static createError({ name = "Error", message }) {
        const error = new Error(message);
        error.name = name;
        throw error;
    }
}



/*export default class CustomError {
    static createError({ name = "Error", cause, message, code = 1 }) {
        const error = new Error(message, { cause })
        error.name = name
        error.code = code

        throw error
    }
}*/