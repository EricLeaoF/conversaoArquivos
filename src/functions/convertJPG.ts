import path from 'path'
import { getAllFiles,getFolders, pdfToJpg, moveFile, renameFile} from './Files';
import { getWindowsUser } from './User';
import fs from 'fs'


export async function convertPDF2JPG(){
    const username = await getWindowsUser();
    const pathRede = `C:/Users/${username}/Desktop/PDF-JPG/Converter`
    const pathSaida = `C:/Users/${username}/Desktop/PDF-JPG/Convertido`
    //const pathLocal = `C:/Users/${username}/Desktop/RPA-ArquivosJPG`;
    const foldersJPG = await getFolders(pathRede)
    for(let i = 0; i<foldersJPG.length;i++){
        let seq = 0
        let seqExc = 0
        const arquivos: string[] = await getAllFiles(`${pathRede}/${foldersJPG[i]}`);
        const qtdJPG = arquivos.length
        for(let arquivo of arquivos){
            console.log(`Gerando ${seq} de ${arquivos.length}`)
            const convertPDF:any = await pdfToJpg(arquivo, pathSaida);
            
            // Procedimento caso sua rede não permita arquivos .jpg
            // const jpg: string[] = await getAllFiles(pathLocal);
            // for(let file of jpg){
            //     const status = await renameFile(file, `${pathSaida}/${path.basename(file, '.jpg')}.jpeg` );
            // }
            fs.unlink(arquivo, (err) => {
                if(err){
                    console.log('Não excluído PDF')
                }else{
                    console.log('Excluído PDF')
                }
            })
            seq += 1
        }
        console.log(`Convertido ${seq} de ${qtdJPG} de PDF para JPG`)
    }
}
