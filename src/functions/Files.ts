import fs from 'fs';
import path from 'path'
import fs_extra from 'fs-extra'
import { Poppler } from 'node-poppler';

export function getAllFiles(dirPath: string, arrayOfFiles?: any): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const files = fs.readdirSync(dirPath)

        arrayOfFiles = arrayOfFiles || []

        files.forEach(function (file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
            } else {
                arrayOfFiles.push(path.join(dirPath, "/", file))
            }
        })

        resolve(arrayOfFiles)
    })

}


export function getFolders(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs_extra.readdir(path, (err, files) => {
            if (err) {
                console.log('A estrutura das pastas estão inválidas, por favor verique')
                reject(err);
            } else {
                resolve(files)
            }
        })
    })
}


export function moveFile(oldPath: string, newPath: string) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                resolve('Falha ao mover o arquivo')
            }
            resolve('Arquivo movido com sucesso')
        })
    })

}

export async function pdfToJpg(filePath: string,  pasta:string) {
    return new Promise(async (resolve, reject) => {
        const file = filePath;
        const nameArquivo = (path.basename(filePath)).replace('.pdf','')
        const poppler = new Poppler();
        const options = {
            firstPageToConvert: 1,
            lastPageToConvert: 2,
            jpegFile: true,
            resolutionXYAxis: 200
        };
        const outputFile = `${pasta}/${nameArquivo}`
        await poppler.pdfToCairo(file, outputFile, options)
            .then(response => {
                resolve(outputFile)
            })
            .catch(error => {
                resolve(false)
            })
    })
}

export async function renameFile(file: string, newPath: string):Promise<any> {
    return new Promise((resolve, reject) => {
        fs_extra.move(file, newPath, { overwrite: true }, err => {
            if (err) {
                resolve(err);
            } else {
                resolve('Arquivo movido');
            }
        })
    })
}
