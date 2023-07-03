import ProductsService from "../services/products.service.js";
import CartService from "../services/carts.service.js";
import UserService from "../services/users.service.js";

const { getAllUsers } = UserService;

export default class ViewsController {

    constructor() {

        this.productsService = new ProductsService();
        this.cartService = new CartService();

    }

    // Vista de los productos

    viewsProducts = async (req, res) => {

        try {

            const { sort, query, page, limit } = req.query;

            const options = {

                limit: limit || 3,
                page: page || 1,
                sort: { price: sort } || { price: 1 },
                lean: true,
            };

            const result = await this.productsService.getAllProducts(query, options);

            const user = req.session.user;

            const response = {
                status: "success",
                payload: result.docs, user,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `/product?page=${result.prevPage}` : null,
                nextLink: result.hasNextPage ? `/product?page=${result.nextPage}` : null,

            }

            console.log(result)



            res.render("index", {
                style: "style.css",
                test: "Prueba",
                ...response,
                user

            });

        } catch (error) {

            req.logger.error(error);


            res.send({ succes: false, error: "ha ocurrido un error" })

        }

    }


    // Product Detail

    viewProductDetail = async (req, res) => {

        try {

            const { pid } = req.params

            const response = await this.productsService.getProductById(pid)

            const user = req.session.user;

            console.log(response)

            res.render("detail", {

                style: "Css/style.css",
                response,
                user,
            });



        } catch (error) {

            req.logger.error(error);

            return res.sendAuthenticationError(error);

        }
    }

    getCartPage = async (req, res) => {

        try {

            const { cid } = req.params

            const user = req.session.user

            const result = await this.cartService.getCartsById(cid)

            const cart = result

            console.log(cart)

            res.render("cart", {
                style: "Css/style.css",
                products: cart.products,
                user,
                cid


            });



        } catch (error) {

            req.logger.error(error);

        }

    }



    // VISTA USUARIOS ADMIN - VISTA SOLO PARA EL ADMINISTRADOR 

    viewsAdmin = async (req, res) => {

        try {

            const role = req.session.user.role;

            const users = await getAllUsers();

            if (role === "ADMIN") {

                return res.render('admin', {
                    style: 'Css.style.css',
                    users,

                })
            }
            return res.redirect('/admin')
        }

        catch (error) {

            req.logger.error(error);

        }

    };


}