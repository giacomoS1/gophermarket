// const { promisify } = require('util');
import { promisify } from 'util'
// const fs = require('fs');
import fs from 'fs';
// const convert = require('heic-convert');
import convert from 'heic-convert';


const heicToPng = (async (dir, name) => {
    try{
        const inputBuffer = await promisify(fs.readFile)(dir);
        const outputBuffer = await convert({
          buffer: inputBuffer, // the HEIC file buffer
          format: 'PNG'        // output format
        });
      
        await promisify(fs.writeFile)(`./${name}`, outputBuffer);
    }
    catch (error) {
        console.log("error");
    }

});

export default heicToPng;