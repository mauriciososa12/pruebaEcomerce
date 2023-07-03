import { ERRORS_ENUM } from "../../const/index.js";

export const errorHandler = (error, req, res, next) => {
    console.log(`El error es: ${error}`);

    const errorMessage = ERRORS_ENUM[error.name] || "Unhandled error";

    res.send({
        status: "Error",
        error: errorMessage,
    });
};


/*import EErrors from "../errors/index.js";

export default (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({ status: "error", error: error.name })
            break
        default:
            res.send({ status: "error", error: "Unhandled error" })
    }
}*/