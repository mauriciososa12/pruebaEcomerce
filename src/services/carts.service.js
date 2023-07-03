import { cartsModel } from "../dao/models/carts.model.js"
import { productModel } from "../dao/models/products.model.js"
import userModel from '../dao/models/user.model.js'
import ticketModel from '../dao/models/ticket.model.js'
import ProductsService from "../services/products.service.js";
import { v4 as uuidv4 } from 'uuid'


export default class CartService {

    constructor() {

        this.productsService = new ProductsService();
    }

    // Creamos el carrito

    createCart = async () => {

        const newCart = {

            products: []
        };

        const result = await cartsModel.create(newCart)

        return result


    }

    // Mostramos todos los carritos

    getCarts = async () => {


        const carts = await cartsModel.find();


        return carts
    }

    // Muestra el carrito x id

    getCartsById = async (cid) => {


        const cart = await cartsModel

            .findById(cid)
            .populate("products.product")
            .lean()
            .exec();

        if (!cart) {

            throw new Error('cart not found')

        };

        return cart

    }

    // Agregar producto al carrito

    addProductToCart = async (cid, pid, uid) => {

        const cart = await this.getCartsById(cid);

        if (!cart) throw new Error('cart not found');

        const product = await productModel.findById(pid).lean();

        if (!product) throw new Error('product not found');


        // Premium no puede agregar sus productos

        const user = await userModel.findById(uid).lean();

        console.log(user)

        if (product.owner && product.owner.toString() === user._id.toString() && user.role === "PREMIUM"

        ) {

            throw new Error(

                "Premium users cannot add their own products to the cart"

            );

        }

        console.log(product.owner)


        /*  if (product.owner == user._id) {
              CustomError.createError({
                  name: "Failed to add product to cart",
                  message: "Cant add to cart a product that you already own",
              });
          } */

        const existingProductInCart = await cartsModel.findOne({
            _id: cid,
            "products.product": pid,
        });

        if (existingProductInCart) {
            const upgradeCart = await cartsModel.updateOne(
                { "products.product": pid },
                {
                    $inc: {
                        "products.product.quantity": 1,

                    },
                }
            );

            return upgradeCart;
        }

        const result = await cartsModel.updateOne(
            { _id: cid },

            {
                $push: {
                    products: { product: pid, quantity: 1 },
                },
            }
        );

        return result;



    };

    // Actualizar la cantidad de un producto

    updateQuantityProduct = async (quantity, cid, pid) => {

        const cart = await this.getCartsById(cid)

        if (!cart) throw new Error('cart not found')

        const product = await cartsModel.findOne({ "products.product": pid })

        if (!product) throw new Error('product not found in cart')

        const updateQuantity = await cartsModel.updateOne(
            {
                _id: cid, "products.product": pid,
            },


            {
                $inc: {
                    "products.$.quantity": quantity,

                },

            });



        return updateQuantity


    }

    // Traer un array de productos dentro del carrito

    arrayProduct = async (cid, products) => {


        const cart = await this.getCartsById(cid)

        if (!cart) throw new Error('cart not found')


        const mapProducts = products.map((product) => {

            return { product: product._id }
        });

        console.log(mapProducts)

        const result = await cartsModel.updateOne(

            { _id: cid },

            {
                $push: {

                    products: { $each: mapProducts },

                },
            },
        );


        return result



    }

    // Eliminar un producto

    deleteProductToCart = async (cid, pid) => {

        const cart = await this.getCartsById(cid)

        if (!cart) throw new Error('cart not found')

        const deleteOne = await cartsModel.updateOne(
            { _id: cid },

            // Eliminar un producto determinado
            {
                $pull: { products: { product: pid }, }
            }
        );

        return deleteOne;



    }

    // Vaciar carrito

    emptyCart = async (cid) => {



        const cart = await this.getCartsById(cid)

        if (!cart) throw new Error('cart not found')

        const emptyCart = await cartsModel.updateOne(
            {
                _id: cid
            },

            // Reemplaza al carrito con un array vacio
            {
                $set: {

                    products: []

                }
            }
        );

        return emptyCart

    }

    purchaseProducts = async (cid) => {

        const cart = await this.getCartsById(cid);

        if (!cart) throw new Error("Cart Not Found");

        const arrayProducts = Array.from(cart.products);

        const purchaser = await userModel.findOne({ cart: cid }).lean().exec();

        const total = await this.removeProductFromStock(cid, arrayProducts);

        const reduceTotal = total.reduce((acc, curr) => acc + curr, 0);

        const ticket = await this.generateTicket(purchaser.email, reduceTotal);


        return ticket;

    };

    generateTicket = async (purchaser, total) => {
        try {
            const result = await ticketModel.create({
                code: uuidv4(),
                amount: total,
                purchaser: purchaser,
            });

            console.log(result)

            return result;
        } catch (error) {
            console.log(error);
        }
    };

    removeProductFromStock = async (cid, products) => {


        const totalProducts = Promise.all(
            products.map(async (product) => {

                console.log(product)

                const producWithStock = await this.productsService.updateStock(

                    product.product._id,
                    product.quantity
                );

                if (producWithStock) {

                    await this.deleteProductToCart(cid, product.product._id);

                    return product.product.price * product.quantity;

                }

                return 0

            })


        );

        return totalProducts



    };


}

