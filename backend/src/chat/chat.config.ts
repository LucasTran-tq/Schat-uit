import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerOptions = {
  // storage properties
  storage: diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = multerConfig.dist;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      //   cb(null, file.fieldname + '-' + uniqueSuffix);
      cb(null, uuidRandom(file));
    },
  }),
};

export const multerConfig = {
  dist: 'assets/uploadedFiles',
};

function uuidRandom(file) {
  //   const result = `${uuid()}${extname(file.originalname)}`;
  const result = Date.now() + '--' + file.originalname;
  return result;
}
