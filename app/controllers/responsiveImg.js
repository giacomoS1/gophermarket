import express from "express";
import sharp from "sharp";
import * as fs from "fs";
import path from "path";
// import { dir } from "console";
import heicToPng from "./heicToPng.js";

const router = express.Router();
var dir = path.resolve('../../productImg/');


// in the future, we will probably just make this a function for backend, but right now I am using it as an input.
router.post("/", async (req, res) => {
    // prodID takes in the product's id, and then will use that to identify the images
    const prodID = req.body;
    console.log(prodID);
    format(prodID);
    res.send("testing worked");
    console.log("images formatted");
})

async function format(prodID) {
    // Checks if product exists, can be used for adding new images. Might need to remove because it will be redundant in image upload function
    if (!fs.existsSync(dir + prodID)) {
        fs.mkdirSync(dir, prodID);
    }
    // Re-assigns directory to folder of images for the product
    dir = dir + `/${prodID}/`;
    // Checks for heic images from iphones and converts them to png because sharp cannot deal with heic images.
    fs.readdirSync(dir).forEach(img => {
        if (path.extname(img) == ".heic") {
            heicToPng(dir + img, img);
        }
    });
    // files.map will iterate through the directory of images 
    const allImgs = dir.map(async img => {
        // prodID represents the image ids
        if (img.extname != ".heic") {
            const prodID = path.parse(img).name;
            await sharp(`${dir}/${img}`)
            .resize({
                width: 246,
            })
            .rotate(90)
            .webp()
            .toFile(`${thumbnail}/${prodID}@lg.webp`);
        }
    })
    await Promise.all(allImgs);
}

export default router;