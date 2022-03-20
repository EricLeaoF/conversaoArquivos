import path from 'path'
import { getAllFiles,getFolders} from './functions/Files';
import {convertJPG2PDF} from './functions/convertPDF'
import {convertPDF2JPG} from './functions/convertJPG'
const imagesToPdf = require("images-to-pdf")
import fs from 'fs'
import process from 'process'

async function main(process:any){
    if(process.argv[2] === 'PDF'){
        await convertJPG2PDF()
    }else if (process.argv[2] === 'JPG'){
        await convertPDF2JPG()
    }else{
        console.log('Argumento não compreendido')
    }
    
}

main(process);