import MyRouter from "./router.js"
import ViewsController from "../controllers/views.controllers.js";
import cartControllers from "../controllers/carts.controllers.js";
import UsersController from "../controllers/users.controllers.js";
import { passportCall } from "../utils/jwt.js";


const viewsController = new ViewsController();
const cartsController = new cartControllers();
const usersController = new UsersController();


export default class ViewsRouter extends MyRouter {

    init() {


        // Vista de los productos

        this.get('/product', passportCall('jwt'), viewsController.viewsProducts)

        // Product Detail

        this.get('/product/:pid', passportCall('jwt'), viewsController.viewProductDetail)

        // Vista del carrito 

        this.get('/cart/:cid', viewsController.getCartPage)

        // Ticket

        this.post("/cart/:cid/purchase", cartsController.purchaseCart);

        // Vista Admin - VISTA SOLO PARA EL ADMINISTRADOR

        this.get('/admin', viewsController.viewsAdmin)

        this.delete('/admin/:uid', usersController.deleteUserCtr)

        this.put('/admin/:uid/role', usersController.changeUsersRol)

    }
}



