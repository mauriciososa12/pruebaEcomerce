import CartsController from "../controllers/carts.controllers.js";
import MyRouter from "./router.js";
import { authToken, authPolicies } from '../utils/jwt.js'

const cartController = new CartsController()


export default class CartsRouter extends MyRouter {

    init() {


        // Agregar un carrito

        this.post('/', cartController.createCart)

        // Vista del carrito

        this.get('/', cartController.getAllCarts)

        // Muestra un carrito determinado con su producto

        this.get('/:cid', cartController.getCartById)

        // Agregar un producto en el carrito

        this.post('/:cid/product/:pid', authToken, authPolicies(["USER", "PREMIUM"]), cartController.addProductToCart)

        // Actualizar la cantidad de un producto

        this.put('/:cid/product/:pid', cartController.updateProductQuantity)

        // Agregar al carrito un array de productos

        this.post('/:cid', cartController.addArrayOfProducts)

        // Eliminar del carrito el producto seleccionado

        this.delete('/:cid/product/:pid', cartController.deleteOneProduct)

        // Vaciar el carrito

        this.delete('/:cid', cartController.emptyCart)

    }
}











