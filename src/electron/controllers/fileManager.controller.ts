import { writeFileSync } from "original-fs";
import windowsService from "../service/windows.service";

class FileManagerController {

    async openFolderSelection(buttonLabel: string){
        const result = await windowsService.openFolderSelection('Selecionar Pasta', buttonLabel);
        return result.canceled ? null : result.filePaths[0];
    }

    async openSaveFileDialog(buttonLabel: string, fileName: string = '') {
        const result = await windowsService.openSaveFileDialog('Selecione o local para salvar a imagem', 'Salvar', fileName);
        return result.canceled ? null : result.filePath;
    }

    async salvarImagem(path: string) {
        writeFileSync
    }

}

export default new FileManagerController();