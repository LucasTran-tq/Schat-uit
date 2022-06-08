import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { multerOptions } from './chat.config';
import { CryptoFileService } from './services/crypto_file_ipfs';
import { Buffer } from 'buffer';

const fs = require('fs');
const multer = require('multer');

var findRemoveSync = require('find-remove');

@Controller('/chat')
export class ChatController {
  constructor(private cryptoFileService: CryptoFileService) {}

  // ! multiple files
  @Post('uploadFiles')
  @UseInterceptors(FilesInterceptor('files', 20, multerOptions))
  public async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      files.forEach(async (element) => {
        const fileName = element.filename;
        console.log(files);

        const file = `${process.env.UPLOAD_FILE_PATH}${fileName}`; // file to upload
        const ipfspath = `${process.env.UPLOAD_FILE_IPFS_PATH}${fileName}`; // ipfspath

        // upload to ipfs path
        await this.cryptoFileService.uploadFileEncrypted(file, ipfspath);

        // delete uploaded files at server
        // fs.unlinkSync(file);

        // // remove older file (1 hour) in decryptedFile folder
        findRemoveSync('assets/uploadedFiles', {
          age: { seconds: 3600 },
          files: '*.*',
          limit: 100,
        });
      });

      files.map((item) => {
        item.path = `http://localhost:3000/uploadedFiles/${item.filename}`;
        return item;
      });

      return {
        files: files,
        message: 'upload file successfully',
      };
    } catch (error) {
      return error;
    }
  }

  // get file
  @Get('getFiles/:fileName')
  async getFile(@Param('fileName') fileName): Promise<StreamableFile> {
    try {
      const filePath = process.env.DECRYPTED_FILE_PATH + fileName;

      if (!fs.existsSync(filePath)) {
        // streaming file
        const ipfspath = `${process.env.UPLOAD_FILE_IPFS_PATH}${fileName}`; // ipfspath

        // download from ipfs path
        const dl = await this.cryptoFileService.downloadFileEncrypted(ipfspath);

        // save buffer to file
        const outfile = process.env.DECRYPTED_FILE_PATH + fileName;

        fs.writeFile(outfile, dl, function (err) {
          if (err) throw err;
        });
      }

      // remove older file (1 hour) in decryptedFile folder
      findRemoveSync('assets/decryptedFiles', {
        age: { seconds: 3600 },
        files: '*.*',
        limit: 100,
      });

      const streamableFile = createReadStream(join(process.cwd(), filePath));
      return new StreamableFile(streamableFile);
    } catch (error) {
      return error;
    }

    // static file
  }

  // get file
  @Get('getStaticFiles/:fileName')
  async getStaticFiles(@Param('fileName') fileName): Promise<any> {
    try {
      const filePath = process.env.DECRYPTED_FILE_PATH + fileName;

      if (!fs.existsSync(filePath)) {
        // streaming file
        const ipfspath = `${process.env.UPLOAD_FILE_IPFS_PATH}${fileName}`; // ipfspath

        // download from ipfs path
        const dl = await this.cryptoFileService.downloadFileEncrypted(ipfspath);

        // save buffer to file
        const outfile = process.env.DECRYPTED_FILE_PATH + fileName;

        fs.writeFile(outfile, dl, function (err) {
          if (err) throw err;
        });
      }

      // remove older file (1 hour) in decryptedFile folder
      findRemoveSync('assets/decryptedFiles', {
        age: { seconds: 3600 },
        files: '*.*',
        limit: 100,
      });

      return {
        path: `http://localhost:3000/decryptedFiles/${fileName}`
      };
      
    } catch (error) {
      return error;
    }

    // *** normal upload
    // // upload file
    // @Post('uploadFiles')
    // @UseInterceptors(FilesInterceptor('files', 30, multerOptions))
    // public async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    //   console.log(files);
    //   return files;
    // }

    // // get file
    // @Get('getFiles/:fileName')
    // getFile(@Param('fileName') fileName): StreamableFile {
    //   const filePath = 'assets/uploadedFiles/' + fileName;
    //   const file = createReadStream(join(process.cwd(), filePath));
    //   return new StreamableFile(file);
    // }
  }
}
