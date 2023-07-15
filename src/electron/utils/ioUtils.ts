import path from "path";
import fs from "fs";

export const apagarArquivo = (arquivo: any) => {
  const dir = path.join(__dirname, `../../uploads/${arquivo}`);
  return new Promise((resolve, reject) => {
    fs.unlink(dir, err => {
      if (err) reject(err);
      resolve(`${arquivo} - arquivo apagado!`);
    });
  });
};

export const getFileContent = (params: any) => {
  var mergedParams = params;
  if (!params.charset) mergedParams = {...params, ...{charset: 'utf-8'}}
  return new Promise((resolve, reject) => {
    fs.readFile(mergedParams.filePath, mergedParams.charset, (error, data) => {
      if(error) reject(Error(error.message));
      resolve(data);
    });
  })  
}

export const createFolderIfNotExists = (params: any) => {
  return new Promise((resolve, reject) => {
    const fe = fs.existsSync(params.dirPath);
    const options = params.recursive ? { recursive: true } :  { recursive: false };
    if (!fe){
      try {
        fs.mkdirSync(params.dirPath, options);
      } catch(error) {
        reject(error);
      }
    } else {
      resolve(false);
    }
  });
};

export const listFiles = async (dirPath: string) => {
    await createFolderIfNotExists({ dirPath });
    return new Promise((resolve, reject) => {
      fs.readdir(dirPath, function(err, files) {
        //handling error
        if (err) reject(err);
        var arquivos: any = [];
        files.forEach(function(file) {
          arquivos.push(file);
        });
        resolve(arquivos);
      });
    });
  };