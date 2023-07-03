import passport from "passport";
import UsersController from "../controllers/users.controllers.js";
import MyRouter from "./router.js";

const usersController = new UsersController()

export default class UsersRouter extends MyRouter {

    init() {

        // REGISTER

        this.get("/register", usersController.getRegister)


        this.post('/register', passport.authenticate('register', { failuredirect: '/errors' }), usersController.postRegister)


        // LOGIN LOCAL

        this.get('/login', usersController.getLogin)

        this.post('/login', passport.authenticate('login', { failuredirect: '/errors' }), usersController.postLogin)

        this.get('/users', usersController.getAllUser)



        // LOGIN GITHUB

        this.get('/login-github', passport.authenticate('gitHub'), async (req, res) => {

        })

        // Callback

        this.get('/githubcallback', passport.authenticate('gitHub', { failuredirect: '/errors' }), usersController.loginGitHub)

        // LOGOUT

        this.get('/logout', usersController.logout)

        // USER PREMIUM

        this.get("/premium/:uid", usersController.changeUserRole)

        // EMAIL

        this.get('/restore', usersController.getRestore)

        this.post('/restore', usersController.postRestore)

        this.get('/restoreForm/:uid/:token', usersController.getRestoreForm)

        this.post('/restoreForm/:uid/:token', usersController.postRestoreForm)

        this.delete('/deleteUsers', usersController.deleteUserInactivity)



    }
}

