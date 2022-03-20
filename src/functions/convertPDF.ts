import path from 'path'
import { getAllFiles,getFolders, moveFile} from './Files';
const imagesToPdf = require("images-to-pdf")
import fs from 'fs'

export async function convertJPG2PDF(){
    const pathRede = `//10.150.0.28/Movida_Multas/Planilhas Indicação/ConverterArquivos/JPG-PDF/Converter`
    const pathSaida = `//10.150.0.28/Movida_Multas/Planilhas Indicação/ConverterArquivos/JPG-PDF/Convertido`
    const foldersJPG = await getFolders(pathRede)
    for(let i = 0; i<foldersJPG.length;i++){
        let seq = 0
        let seqExc = 0
        const arquivos: string[] = await getAllFiles(`${pathRede}/${foldersJPG[i]}`);
        const qtdJPG = arquivos.length
        for(let arquivo of arquivos){
            console.log(`Gerando ${seq} de ${arquivos.length}`)
            const nomeArquivoCE = path.basename(arquivo)
            const nomeArquivoSE = nomeArquivoCE.replace('.jpeg','')
            await imagesToPdf([arquivo], `${pathSaida}/${nomeArquivoSE}.pdf`)
            fs.unlink(arquivo, (err) => {
                if(err){
                    console.log('Não excluído JPG')
                }else{
                    console.log('Excluído JPG')
                }
            })
            seq += 1
            seqExc += 1
        }
        console.log(`Convertido ${seq} de ${qtdJPG} de JPG para PDF e Excluído ${seqExc} JPG`)
    }
}
