import Jimp from "jimp";
import imageService, { printOnImageProps } from "../service/image.service";

class ImageController {

  async previewImage(params: printOnImageProps): Promise<string> {
    let result = await imageService.printOnImageFromPath(params);
    return result.getBase64Async(Jimp.MIME_PNG);
  }

}

export default new ImageController();