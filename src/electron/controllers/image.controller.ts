import Jimp from "jimp";
import imageService, { printOnImageProps } from "../service/image.service";
import fileManagerController from "./fileManager.controller";
import Picture from "../../model/picture";

class ImageController {

  async previewImage(params: printOnImageProps): Promise<string> {
    let result = await imageService.printOnImageFromPath(params);
    return result.getBase64Async(Jimp.MIME_PNG);
  }

  async salvarImagem(params: Picture) {
    let result = await fileManagerController.openSaveFileDialog("Salvar", params.title.replace('[^a-zA-Z0-9]', '')+'.png');
    result = result.replace(/(\.+png)+$/g, '.png');

    if (result !== null) {
      (await imageService.jimpFromBase64(params.base64)).write(result);
    }
  }

}

export default new ImageController();
