import express from "express";
import sharp from "sharp";
import * as fs from "fs";
import path from "path";
import bodyParser from 'body-parser';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// import { dir } from "console";
import heicToPng from "./heicToPng.js";
import { name } from "ejs";
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();
var jsonParser = bodyParser.json()

// in the future, we will probably just make this a function for backend, but right now I am using it as an input.
router.post("/", jsonParser, async (req, res) => {
    // prodID takes in the product's id, and then will use that to identify the images
    const prodID = req.body.prodID;
    await format(prodID);
    res.send("testing worked");
    console.log("images formatted");
})

async function format(prodID) {
    var dir = path.resolve(__dirname, '../../productImg/');
    // Checks if product exists, can be used for adding new images. Might need to remove because it will be redundant in image upload function
    if (!fs.existsSync(dir + `\\${prodID}`)) {
        fs.mkdirSync(dir + `\\${prodID}`);
    }
    // Re-assigns directory to folder of images for the product
    dir = dir + `\\${prodID}`;
    // Checks for heic images from iphones and converts them to png because sharp cannot deal with heic images.
    await fs.readdirSync(dir).forEach(img => {
        const name = img.slice(0,img.indexOf('.'))
        console.log(img.slice(0,img.indexOf('.')));
        if (path.extname(img) == ".heic") {
            heicToPng(dir +`\\${img}`, dir + `\\${name}`);
        }
    });

    // Responsive image conversion
    fs.readdirSync(dir).forEach(async img => {
        console.log(img.substring(img.indexOf('.')));
        if (img.substring(img.indexOf('.')) != ".heic") {
            console.log(path.parse(img).name);
            // Reads the name of the file, without the extname
            const name = path.parse(img).name;
            if (name.indexOf('@') == -1 ) {
                await sharp(`${dir}/${img}`)
                .resize({
                    width: 246,
                })
                .rotate(90)
                .webp()
                .toFile(`${dir}/${name}@lg.webp`);
            }
        }
    })
}

export default router;