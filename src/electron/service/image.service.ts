
import * as path from 'path'
import FontProps from '../../model/fontProps';
import Jimp from 'jimp';

const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 250;
const DEFAULT_TEXT_HEIGHT = 40;
const BORDER_COLOR = 0x000000FF;

const TEMP_PATH = path.join(path.resolve(), "../temp");
const ASPECT_RATIO_A3 = 1.41391106;
const ASPECT_RATIO_A4 = 1.41427563;

const WIDTH_IMAGE = 1024;
const WIDTH_PDF_A4 = 580;
const WIDTH_PDF_A3 = 841.89;

const REGEX_TIPO_IMAGEM = /^data:[\w\/0-9]+;base64,/gi;

export interface printOnImageProps  {
  text: string;
  imagePath: any;
  font?: string;
  backgroundColor?: string;
  withBorder?: boolean;
}

export interface printOnImageBase64Props  {
  text: string;
  imageFile: string;
  font?: FontProps;
  backgroundColor?: string;
}


export interface AddTitleProps {
  text: string;
  image: Jimp;
  font?: string;
  backgroundColor?: string
}

function horizontalLine (x:any, y:any, offset:any) {
  this.bitmap.data.writeUInt32BE(BORDER_COLOR, offset, true)
};

class ImageService {

  async printOnImageFromPath(props: printOnImageProps): Promise<Jimp> {
    let image: Jimp = await this.resizeImageFromPath(props);
    image = await this.addTitle({text: props.text, image, font: props.font, backgroundColor: props.backgroundColor});
    if (props.withBorder) {
      image = await this.addBorder({image})  
    }
    return image;

  }

  async resizeImageFromPath(props: any): Promise<Jimp> {
    let image = await Jimp.read(props.imagePath);
    image.resize(DEFAULT_WIDTH, DEFAULT_HEIGHT);
    return image;
  }

  async resizeImage (props: any) {
    let image = null;
    try {
        image = await this.convertImage(props);
    } catch (erro) {
        console.log(erro);
    }
    image.resize(DEFAULT_WIDTH, DEFAULT_HEIGHT);
    return image;
  }

  async convertImage(props: printOnImageBase64Props): Promise<Jimp> {
    return new Promise(async (resolve, reject) => {
        // Read image type supported by jimp
        Jimp.read(Buffer.from(props.imageFile.replace(REGEX_TIPO_IMAGEM, ''), 'base64')).then(async img => {
          resolve(img)
        }); 
    });
  }

  async addTitle(props: AddTitleProps): Promise<Jimp> {
    const DEFAULT_FONT = await this.getFontOrDefault(props.font);
    let firstPixelColor =  props.backgroundColor || props.image.getPixelColor(0,0);
    let imageText = new Jimp(DEFAULT_WIDTH, DEFAULT_HEIGHT + DEFAULT_TEXT_HEIGHT, firstPixelColor);
    imageText.print(DEFAULT_FONT,
        0, 
        0, 
        {
            text: props.text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_TOP
        }, 
        DEFAULT_WIDTH, 
        DEFAULT_HEIGHT
    );
    imageText.blit(props.image, 0, DEFAULT_TEXT_HEIGHT);
    return imageText; 
  }


  async addBorder(props: any): Promise<Jimp> {
      props.image.scan(0, 0, DEFAULT_WIDTH, 1, horizontalLine);
      props.image.scan(0, 0, 1, DEFAULT_HEIGHT+DEFAULT_TEXT_HEIGHT, horizontalLine);
      props.image.scan(DEFAULT_HEIGHT, DEFAULT_HEIGHT+DEFAULT_TEXT_HEIGHT-2, DEFAULT_WIDTH, 1, horizontalLine);
      props.image.scan(DEFAULT_WIDTH-1, 0, 1, DEFAULT_HEIGHT+DEFAULT_TEXT_HEIGHT, horizontalLine);
      return props.image;
  }

  async getFontOrDefault(font: string = "FONT_SANS_32_BLACK"): Promise<any>{
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await Jimp.loadFont(Jimp[font]);
    } catch (error) {
        console.error(`Font ${font} not available. Using default font ${Jimp.FONT_SANS_32_BLACK}`);
        return await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    }
  };

}

export default new ImageService();
