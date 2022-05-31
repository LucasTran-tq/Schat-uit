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

  // *** ipfs upload
  // ! upload 1 file
  // @Post('uploadFiles')
  // @UseInterceptors(FileInterceptor('files', multerOptions))
  // public async uploadFile(@UploadedFile() files) {
  //   try {
  //     const fileName = files.filename;
  //     console.log(files);

  //     const file = `${process.env.UPLOAD_FILE_PATH}${fileName}`; // file to upload
  //     const ipfspath = `${process.env.UPLOAD_FILE_IPFS_PATH}${fileName}`; // ipfspath

  //     // upload to ipfs path
  //     await this.cryptoFileService.uploadFileEncrypted(file, ipfspath);

  //     // delete uploaded files at server
  //     fs.unlinkSync(file);

  //     return {
  //       files: files,
  //       message: 'upload file successfully',
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // ! multiple files
  @Post('uploadFiles')
  @UseInterceptors(FilesInterceptor('files', 30, multerOptions))
  // @UseInterceptors(FileInterceptor('files', multerOptions))
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
        fs.unlinkSync(file);
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
        // console.log(fileName);
        const ipfspath = `${process.env.UPLOAD_FILE_IPFS_PATH}${fileName}`; // ipfspath

        // download from ipfs path
        const dl = await this.cryptoFileService.downloadFileEncrypted(ipfspath);

        // save buffer to file
        const outfile = process.env.DECRYPTED_FILE_PATH + fileName;
        // console.log('writing:', outfile);
        fs.writeFile(outfile, dl, function (err) {
          if (err) throw err;
        });

        // console.log('The File is decrypted successfully');
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
