import MyRouter from "./router.js";
import UsersController from "../controllers/users.controllers.js";
import { authToken } from "../utils/jwt.js";

const usersController = new UsersController()

export default class SessionRouter extends MyRouter {

    init() {
        // Trae los datos del user loguedo
        this.get('/current', authToken, usersController.getCurrentUser)

    }
}