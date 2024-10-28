import express from "express";
import pg from "pg";
const app = express.Router();
import * as productService from "../database/productService.js";


app.get("/", async (req,res) => {
    const tagList = await productService.getTags();
    if (req.query.prodID) {
        console.log(req.query.prodID);
        const product = await productService.getProductAndUserInfoByProductID(req.query.prodID)
        console.log(product)
        res.render("product.ejs", {product: product[0]})
    } else {
        const prodList = await productService.getAllProductsByPage(20, 1);

        console.log(prodList);
        res.render("browse.ejs", {prodList: prodList, tagList: tagList})
    }

});


export default app;