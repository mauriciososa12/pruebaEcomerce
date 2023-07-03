import { ERRORS_ENUM } from "../const/error.js";
import CustomError from "../errors/customError.js";
import { generateProductErrorInfo } from "../errors/infoError.js";

import ProductsService from "../services/products.service.js";

export default class ProductsController {

    constructor() {

        this.productsService = new ProductsService();
    }

    getAllProductsCtr = async (req, res) => {

        try {

            const { sort, query, page, limit } = req.query;

            const options = {

                limit: limit || 5,
                page: page || 1,
                sort: { price: sort } || { price: 1 },
                lean: true,
            };

            const products = await this.productsService.getAllProducts(query, options);

            if (!products) {
                CustomError.createError({
                    message: ERRORS_ENUM["PRODUCT NOT FOUND"],
                });
            }


            res.send({
                status: "success",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage
                    ? `/api/products?page=${products.prevPage}`
                    : null,
                nextLink: products.hasNextPage
                    ? `/api/products?page=${products.nextPage}`
                    : null,

            })


        } catch (error) {


            res.sendServerError(error)



        }

    }

    // Traer un solo producto por id

    getProductByIdCtr = async (req, res) => {

        try {

            const { pid } = req.params

            const product = await this.productsService.getProductById(pid)

            if (!product) {
                CustomError.createError({
                    message: ERRORS_ENUM["PRODUCT NOT FOUND"],
                });
            }


            res.send({
                status: "succes",
                payload: product
            })


        } catch (error) {



            res.sendServerError(error)


        }

    }

    // Agregar un producto

    addNewProductCtr = async (req, res) => {

        try {

            const newProduct = req.body
            const user = req.user;

            const { title, price, description, code, category } = newProduct;

            if (!title || !price || !description || !code || !category) {
                CustomError.createError({
                    name: ERRORS_ENUM["INVALID PRODUCT PROPERTY"],
                    message: generateProductErrorInfo(newProduct),
                });
            }

            console.log(newProduct);
            console.log(user);

            const result = await this.productsService.addNewProduct(
                newProduct,
                user._id)

            if (!result) {
                CustomError.createError({
                    message: ERRORS_ENUM["INVALID PRODUCT PROPERTY"],
                });
            }

            res.sendSuccess({ result });

        } catch (error) {



            res.sendServerError({ error: error.message });



        }
    }


    // Actualizar un producto

    updateProductCtr = async (req, res) => {

        try {

            const { pid } = req.params

            const updateProduct = req.body

            const result = await this.productsService.updateProduct(pid, updateProduct)

            if (!result) {
                CustomError.createError({
                    message: ERRORS_ENUM["PRODUCT NOT FOUND"],
                });
            }

            res.sendSuccess({ result });

        } catch (error) {

            res.sendServerError({ error: error.message });

        }


    }

    // Eliminar un producto

    deleteProductCtr = async (req, res) => {
        try {

            const { pid } = req.params
            const user = req.user

            const result = await this.productsService.deleteProduct(

                pid,
                user
            )

            if (!result) {
                CustomError.createError({
                    message: ERRORS_ENUM["PRODUCT NOT FOUND"],
                });
            }

            return res.sendSuccess({ result });

        } catch (error) {

            return res.sendServerError({ error: error.message });
        }
    }


}
